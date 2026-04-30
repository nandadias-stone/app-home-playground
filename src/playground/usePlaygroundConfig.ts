import { useCallback } from 'react';
import { useFileBackedState } from '@/state/useFileBackedState';
import { DEFAULT_ORDER, WIDGET_REGISTRY, type WidgetId } from './widget-registry';
import type { PlaygroundConfig, WidgetConfig } from './types';

const STATE_KEY = 'playground.config';

function buildDefaultConfig(): PlaygroundConfig {
  return {
    widgets: DEFAULT_ORDER.map((id) => {
      const entry = WIDGET_REGISTRY[id];
      const states = entry.states ?? [];
      return {
        id,
        enabled: true,
        version: entry.versions[0] ?? 'v1',
        ...(states.length > 0 ? { state: states[0].id } : {}),
      };
    }),
  };
}

function sanitize(raw: unknown, fallback?: PlaygroundConfig): PlaygroundConfig {
  const defaults = fallback ?? buildDefaultConfig();
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

    const states = entry.states ?? [];
    const incomingState = (item as WidgetConfig).state;
    const state =
      states.length === 0
        ? undefined
        : states.some((s) => s.id === incomingState)
          ? incomingState
          : states[0].id;

    valid.push({
      id,
      enabled: Boolean((item as WidgetConfig).enabled),
      version,
      ...(state !== undefined ? { state } : {}),
    });
  }

  for (const id of DEFAULT_ORDER) {
    if (!seen.has(id)) {
      const entry = WIDGET_REGISTRY[id];
      const states = entry.states ?? [];
      valid.push({
        id,
        enabled: true,
        version: entry.versions[0] ?? 'v1',
        ...(states.length > 0 ? { state: states[0].id } : {}),
      });
    }
  }

  return { widgets: valid };
}

export type PlaygroundActions = {
  config: PlaygroundConfig;
  toggleWidget: (id: WidgetId) => void;
  setVersion: (id: WidgetId, version: string) => void;
  setState: (id: WidgetId, state: string) => void;
  reorder: (fromIndex: number, toIndex: number) => void;
  reset: () => void;
  replaceConfig: (next: PlaygroundConfig) => void;
};

export function usePlaygroundConfig(): PlaygroundActions {
  const [config, setConfig] = useFileBackedState<PlaygroundConfig>(
    STATE_KEY,
    buildDefaultConfig(),
    sanitize,
  );

  const toggleWidget = useCallback(
    (id: WidgetId) => {
      setConfig({
        widgets: config.widgets.map((w) =>
          w.id === id ? { ...w, enabled: !w.enabled } : w,
        ),
      });
    },
    [config, setConfig],
  );

  const setVersion = useCallback(
    (id: WidgetId, version: string) => {
      setConfig({
        widgets: config.widgets.map((w) => (w.id === id ? { ...w, version } : w)),
      });
    },
    [config, setConfig],
  );

  const setState = useCallback(
    (id: WidgetId, state: string) => {
      setConfig({
        widgets: config.widgets.map((w) => (w.id === id ? { ...w, state } : w)),
      });
    },
    [config, setConfig],
  );

  const reorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return;
      const next = config.widgets.slice();
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      setConfig({ widgets: next });
    },
    [config, setConfig],
  );

  const reset = useCallback(() => {
    setConfig(buildDefaultConfig());
  }, [setConfig]);

  const replaceConfig = useCallback(
    (next: PlaygroundConfig) => {
      setConfig(sanitize(next));
    },
    [setConfig],
  );

  return { config, toggleWidget, setVersion, setState, reorder, reset, replaceConfig };
}
