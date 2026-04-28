import { useCallback, useEffect, useState } from 'react';
import { WIDGET_REGISTRY, type WidgetId } from '@/playground';

const STORAGE_KEY = 'stone-promotion-v1';

type PromotionConfig = {
  promoted: Partial<Record<WidgetId, string[]>>;
};

function buildDefault(): PromotionConfig {
  const promoted: Partial<Record<WidgetId, string[]>> = {};
  for (const id of Object.keys(WIDGET_REGISTRY) as WidgetId[]) {
    promoted[id] = [...WIDGET_REGISTRY[id].versions];
  }
  return { promoted };
}

function sanitize(raw: unknown): PromotionConfig {
  const defaults = buildDefault();
  if (!raw || typeof raw !== 'object') return defaults;
  const candidate = raw as Partial<PromotionConfig>;
  if (!candidate.promoted || typeof candidate.promoted !== 'object') return defaults;

  const promoted: Partial<Record<WidgetId, string[]>> = {};
  for (const id of Object.keys(WIDGET_REGISTRY) as WidgetId[]) {
    const stored = candidate.promoted[id];
    const valid = WIDGET_REGISTRY[id].versions;
    if (Array.isArray(stored)) {
      // Mantém apenas versões que ainda existem
      promoted[id] = stored.filter((v) => valid.includes(v));
    } else {
      // Widget ainda não tem registro: promove todas
      promoted[id] = [...valid];
    }
  }
  return { promoted };
}

function load(): PromotionConfig {
  if (typeof window === 'undefined') return buildDefault();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildDefault();
    return sanitize(JSON.parse(raw));
  } catch {
    return buildDefault();
  }
}

function persist(config: PromotionConfig) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignora
  }
}

export type PromotionActions = {
  config: PromotionConfig;
  isPromoted: (widgetId: WidgetId, version: string) => boolean;
  togglePromotion: (widgetId: WidgetId, version: string) => void;
  getPromotedVersions: (widgetId: WidgetId) => string[];
  reset: () => void;
};

export function usePromotionConfig(): PromotionActions {
  const [config, setConfig] = useState<PromotionConfig>(() => load());

  useEffect(() => {
    persist(config);
  }, [config]);

  const isPromoted = useCallback(
    (widgetId: WidgetId, version: string) => {
      return config.promoted[widgetId]?.includes(version) ?? false;
    },
    [config],
  );

  const togglePromotion = useCallback((widgetId: WidgetId, version: string) => {
    setConfig((prev) => {
      const current = prev.promoted[widgetId] ?? [];
      const next = current.includes(version)
        ? current.filter((v) => v !== version)
        : [...current, version].sort();
      return {
        promoted: { ...prev.promoted, [widgetId]: next },
      };
    });
  }, []);

  const getPromotedVersions = useCallback(
    (widgetId: WidgetId) => config.promoted[widgetId] ?? [],
    [config],
  );

  const reset = useCallback(() => {
    setConfig(buildDefault());
  }, []);

  return { config, isPromoted, togglePromotion, getPromotedVersions, reset };
}
