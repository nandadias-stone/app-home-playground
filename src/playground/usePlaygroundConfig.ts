import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_ORDER, WIDGET_REGISTRY, type WidgetId } from './widget-registry';
import type { PlaygroundConfig, WidgetConfig } from './types';

const STORAGE_KEY = 'stone-playground-config-v1';

function buildDefaultConfig(): PlaygroundConfig {
  return {
    widgets: DEFAULT_ORDER.map((id) => ({
      id,
      enabled: true,
      version: WIDGET_REGISTRY[id].versions[0] ?? 'v1',
    })),
  };
}

function sanitize(raw: unknown): PlaygroundConfig {
  const defaults = buildDefaultConfig();
  if (!raw || typeof raw !== 'object') return defaults;

  const candidate = raw as Partial<PlaygroundConfig>;
  if (!Array.isArray(candidate.widgets)) return defaults;

  const seen = new Set<WidgetId>();
  const valid: WidgetConfig[] = [];

  for (const item of candidate.widgets) {
    if (!item || typeof item !== 'object') continue;
    const id = (item as WidgetConfig).id;
    if (!(id in WIDGET_REGISTRY) || seen.has(id)) continue;
    seen.add(id);

    const entry = WIDGET_REGISTRY[id];
    const version = entry.versions.includes((item as WidgetConfig).version)
      ? (item as WidgetConfig).version
      : entry.versions[0];

    valid.push({
      id,
      enabled: Boolean((item as WidgetConfig).enabled),
      version,
    });
  }

  // Adiciona widgets novos (ainda não vistos) ao final, na ordem default
  for (const id of DEFAULT_ORDER) {
    if (!seen.has(id)) {
      valid.push({
        id,
        enabled: true,
        version: WIDGET_REGISTRY[id].versions[0] ?? 'v1',
      });
    }
  }

  return { widgets: valid };
}

function load(): PlaygroundConfig {
  if (typeof window === 'undefined') return buildDefaultConfig();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildDefaultConfig();
    return sanitize(JSON.parse(raw));
  } catch {
    return buildDefaultConfig();
  }
}

function persist(config: PlaygroundConfig) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignora quota / privado
  }
}

export type PlaygroundActions = {
  config: PlaygroundConfig;
  toggleWidget: (id: WidgetId) => void;
  setVersion: (id: WidgetId, version: string) => void;
  reorder: (fromIndex: number, toIndex: number) => void;
  reset: () => void;
};

export function usePlaygroundConfig(): PlaygroundActions {
  const [config, setConfig] = useState<PlaygroundConfig>(() => load());

  useEffect(() => {
    persist(config);
  }, [config]);

  const toggleWidget = useCallback((id: WidgetId) => {
    setConfig((prev) => ({
      widgets: prev.widgets.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w)),
    }));
  }, []);

  const setVersion = useCallback((id: WidgetId, version: string) => {
    setConfig((prev) => ({
      widgets: prev.widgets.map((w) => (w.id === id ? { ...w, version } : w)),
    }));
  }, []);

  const reorder = useCallback((fromIndex: number, toIndex: number) => {
    setConfig((prev) => {
      if (fromIndex === toIndex) return prev;
      const next = prev.widgets.slice();
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return { widgets: next };
    });
  }, []);

  const reset = useCallback(() => {
    setConfig(buildDefaultConfig());
  }, []);

  return { config, toggleWidget, setVersion, reorder, reset };
}
