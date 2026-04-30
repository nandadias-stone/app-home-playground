import { useCallback } from 'react';
import { useFileBackedState } from '@/state/useFileBackedState';
import { WIDGET_REGISTRY, type WidgetId } from '@/playground';

const STATE_KEY = 'promotion';

export type VersionMetadata = {
  label?: string;
};

type PromotionConfig = {
  promoted: Partial<Record<WidgetId, string[]>>;
  metadata: Partial<Record<WidgetId, Record<string, VersionMetadata>>>;
};

function buildDefault(): PromotionConfig {
  const promoted: Partial<Record<WidgetId, string[]>> = {};
  for (const id of Object.keys(WIDGET_REGISTRY) as WidgetId[]) {
    promoted[id] = [...WIDGET_REGISTRY[id].versions];
  }
  return { promoted, metadata: {} };
}

function sanitize(raw: unknown): PromotionConfig {
  const defaults = buildDefault();
  if (!raw || typeof raw !== 'object') return defaults;
  const candidate = raw as Partial<PromotionConfig>;

  const promoted: Partial<Record<WidgetId, string[]>> = {};
  for (const id of Object.keys(WIDGET_REGISTRY) as WidgetId[]) {
    const stored = candidate.promoted?.[id];
    const valid = WIDGET_REGISTRY[id].versions;
    if (Array.isArray(stored)) {
      promoted[id] = stored.filter((v) => valid.includes(v));
    } else {
      promoted[id] = [...valid];
    }
  }

  const metadata: Partial<Record<WidgetId, Record<string, VersionMetadata>>> = {};
  if (candidate.metadata && typeof candidate.metadata === 'object') {
    for (const id of Object.keys(WIDGET_REGISTRY) as WidgetId[]) {
      const widgetMeta = candidate.metadata[id];
      if (widgetMeta && typeof widgetMeta === 'object') {
        const valid = WIDGET_REGISTRY[id].versions;
        const cleaned: Record<string, VersionMetadata> = {};
        for (const [version, meta] of Object.entries(widgetMeta)) {
          if (!valid.includes(version) || !meta || typeof meta !== 'object') continue;
          if (typeof meta.label === 'string' && meta.label !== '') {
            cleaned[version] = { label: meta.label };
          }
        }
        if (Object.keys(cleaned).length > 0) metadata[id] = cleaned;
      }
    }
  }

  return { promoted, metadata };
}

export type PromotionActions = {
  config: PromotionConfig;
  isPromoted: (widgetId: WidgetId, version: string) => boolean;
  togglePromotion: (widgetId: WidgetId, version: string) => void;
  getPromotedVersions: (widgetId: WidgetId) => string[];
  getMetadata: (widgetId: WidgetId, version: string) => VersionMetadata;
  setLabel: (widgetId: WidgetId, version: string, label: string) => void;
  hardDeleteVersion: (widgetId: WidgetId, version: string) => Promise<void>;
  reset: () => void;
};

export function usePromotionConfig(): PromotionActions {
  const [config, setConfig] = useFileBackedState<PromotionConfig>(
    STATE_KEY,
    buildDefault(),
    sanitize,
  );

  const isPromoted = useCallback(
    (widgetId: WidgetId, version: string) => {
      return config.promoted[widgetId]?.includes(version) ?? false;
    },
    [config],
  );

  const togglePromotion = useCallback(
    (widgetId: WidgetId, version: string) => {
      const current = config.promoted[widgetId] ?? [];
      const next = current.includes(version)
        ? current.filter((v) => v !== version)
        : [...current, version].sort();
      setConfig({ ...config, promoted: { ...config.promoted, [widgetId]: next } });
    },
    [config, setConfig],
  );

  const getPromotedVersions = useCallback(
    (widgetId: WidgetId) => config.promoted[widgetId] ?? [],
    [config],
  );

  const getMetadata = useCallback(
    (widgetId: WidgetId, version: string): VersionMetadata => {
      return config.metadata[widgetId]?.[version] ?? {};
    },
    [config],
  );

  const setLabel = useCallback(
    (widgetId: WidgetId, version: string, label: string) => {
      const widgetMeta = { ...(config.metadata[widgetId] ?? {}) };
      const trimmed = label.trim();
      if (trimmed === '') {
        delete widgetMeta[version];
      } else {
        widgetMeta[version] = { ...(widgetMeta[version] ?? {}), label: trimmed };
      }
      setConfig({ ...config, metadata: { ...config.metadata, [widgetId]: widgetMeta } });
    },
    [config, setConfig],
  );

  const hardDeleteVersion = useCallback(
    async (widgetId: WidgetId, version: string) => {
      if (version === 'v1') {
        throw new Error('A versão v1 não pode ser excluída');
      }
      const folderName = WIDGET_REGISTRY[widgetId].folderName;
      const res = await fetch('/api/version/delete', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ folderName, version }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Falha ao excluir (${res.status})`);
      }
      // Limpa estado local antes de recarregar
      const promoted = { ...config.promoted };
      const list = promoted[widgetId] ?? [];
      promoted[widgetId] = list.filter((v) => v !== version);
      const metadata = { ...config.metadata };
      const widgetMeta = { ...(metadata[widgetId] ?? {}) };
      delete widgetMeta[version];
      metadata[widgetId] = widgetMeta;
      setConfig({ promoted, metadata });
      setTimeout(() => window.location.reload(), 100);
    },
    [config, setConfig],
  );

  const reset = useCallback(() => {
    setConfig(buildDefault());
  }, [setConfig]);

  return {
    config,
    isPromoted,
    togglePromotion,
    getPromotedVersions,
    getMetadata,
    setLabel,
    hardDeleteVersion,
    reset,
  };
}
