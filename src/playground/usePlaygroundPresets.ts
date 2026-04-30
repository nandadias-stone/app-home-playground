import { useCallback } from 'react';
import { useFileBackedState } from '@/state/useFileBackedState';
import type { PlaygroundConfig } from './types';

const STATE_KEY = 'playground.presets';

export type PresetEntry = {
  id: string;
  name: string;
  config: PlaygroundConfig;
  createdAt: number;
  updatedAt: number;
};

type PresetsState = {
  presets: PresetEntry[];
  activePresetId: string | null;
};

const EMPTY_STATE: PresetsState = { presets: [], activePresetId: null };

function isValidPreset(p: unknown): p is PresetEntry {
  if (!p || typeof p !== 'object') return false;
  const candidate = p as PresetEntry;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    candidate.config != null &&
    Array.isArray(candidate.config.widgets)
  );
}

function sanitize(raw: unknown): PresetsState {
  if (!raw || typeof raw !== 'object') return EMPTY_STATE;
  const candidate = raw as Partial<PresetsState>;
  const presets = Array.isArray(candidate.presets)
    ? candidate.presets.filter(isValidPreset)
    : [];
  const activePresetId =
    typeof candidate.activePresetId === 'string' &&
    presets.some((p) => p.id === candidate.activePresetId)
      ? candidate.activePresetId
      : null;
  return { presets, activePresetId };
}

function genId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `preset-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export type PresetsActions = {
  presets: PresetEntry[];
  activePresetId: string | null;
  activePreset: PresetEntry | null;
  isModified: (currentConfig: PlaygroundConfig) => boolean;
  savePresetAs: (name: string, config: PlaygroundConfig) => string;
  loadPreset: (id: string) => PresetEntry | null;
  updateActivePreset: (config: PlaygroundConfig) => void;
  deletePreset: (id: string) => void;
  renamePreset: (id: string, name: string) => void;
  duplicatePreset: (id: string) => string | null;
  clearActive: () => void;
};

export function usePlaygroundPresets(): PresetsActions {
  const [state, setState] = useFileBackedState<PresetsState>(
    STATE_KEY,
    EMPTY_STATE,
    sanitize,
  );

  const activePreset =
    state.activePresetId != null
      ? state.presets.find((p) => p.id === state.activePresetId) ?? null
      : null;

  const isModified = useCallback(
    (currentConfig: PlaygroundConfig) => {
      if (!activePreset) return false;
      return JSON.stringify(currentConfig) !== JSON.stringify(activePreset.config);
    },
    [activePreset],
  );

  const savePresetAs = useCallback(
    (name: string, config: PlaygroundConfig) => {
      const id = genId();
      const now = Date.now();
      const preset: PresetEntry = {
        id,
        name: name.trim() || 'Sem nome',
        config: JSON.parse(JSON.stringify(config)),
        createdAt: now,
        updatedAt: now,
      };
      setState({
        presets: [...state.presets, preset],
        activePresetId: id,
      });
      return id;
    },
    [state, setState],
  );

  const loadPreset = useCallback(
    (id: string): PresetEntry | null => {
      const preset = state.presets.find((p) => p.id === id) ?? null;
      if (preset) setState({ ...state, activePresetId: id });
      return preset;
    },
    [state, setState],
  );

  const updateActivePreset = useCallback(
    (config: PlaygroundConfig) => {
      if (state.activePresetId == null) return;
      setState({
        ...state,
        presets: state.presets.map((p) =>
          p.id === state.activePresetId
            ? {
                ...p,
                config: JSON.parse(JSON.stringify(config)),
                updatedAt: Date.now(),
              }
            : p,
        ),
      });
    },
    [state, setState],
  );

  const deletePreset = useCallback(
    (id: string) => {
      setState({
        presets: state.presets.filter((p) => p.id !== id),
        activePresetId: state.activePresetId === id ? null : state.activePresetId,
      });
    },
    [state, setState],
  );

  const renamePreset = useCallback(
    (id: string, name: string) => {
      setState({
        ...state,
        presets: state.presets.map((p) =>
          p.id === id ? { ...p, name: name.trim() || p.name, updatedAt: Date.now() } : p,
        ),
      });
    },
    [state, setState],
  );

  const duplicatePreset = useCallback(
    (id: string): string | null => {
      const original = state.presets.find((p) => p.id === id);
      if (!original) return null;
      const now = Date.now();
      const newId = genId();
      const copy: PresetEntry = {
        ...original,
        id: newId,
        name: `${original.name} (cópia)`,
        config: JSON.parse(JSON.stringify(original.config)),
        createdAt: now,
        updatedAt: now,
      };
      setState({ ...state, presets: [...state.presets, copy] });
      return newId;
    },
    [state, setState],
  );

  const clearActive = useCallback(() => {
    setState({ ...state, activePresetId: null });
  }, [state, setState]);

  return {
    presets: state.presets,
    activePresetId: state.activePresetId,
    activePreset,
    isModified,
    savePresetAs,
    loadPreset,
    updateActivePreset,
    deletePreset,
    renamePreset,
    duplicatePreset,
    clearActive,
  };
}
