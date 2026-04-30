import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { usePlaygroundConfig, type PlaygroundActions } from './usePlaygroundConfig';
import { usePlaygroundPresets, type PresetEntry } from './usePlaygroundPresets';

type PlaygroundContextValue = PlaygroundActions & {
  // Estado dos presets
  presets: PresetEntry[];
  activePresetId: string | null;
  activePreset: PresetEntry | null;
  isModified: boolean;
  // Actions dos presets — todas usam a config atual implicitamente
  savePresetAs: (name: string) => string;
  loadPreset: (id: string) => PresetEntry | null;
  updateActivePreset: () => void;
  deletePreset: (id: string) => void;
  renamePreset: (id: string, name: string) => void;
  duplicatePreset: (id: string) => string | null;
  clearActivePreset: () => void;
  // Refresh
  refreshKey: number;
  triggerRefresh: () => void;
};

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const config = usePlaygroundConfig();
  const presetsHook = usePlaygroundPresets();
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  const loadPreset = useCallback(
    (id: string) => {
      const preset = presetsHook.loadPreset(id);
      if (preset) {
        config.replaceConfig(preset.config);
      }
      return preset;
    },
    [presetsHook, config],
  );

  const savePresetAs = useCallback(
    (name: string) => presetsHook.savePresetAs(name, config.config),
    [presetsHook, config.config],
  );

  const updateActivePreset = useCallback(
    () => presetsHook.updateActivePreset(config.config),
    [presetsHook, config.config],
  );

  const isModified = presetsHook.isModified(config.config);

  const value: PlaygroundContextValue = {
    config: config.config,
    toggleWidget: config.toggleWidget,
    setVersion: config.setVersion,
    setState: config.setState,
    reorder: config.reorder,
    reset: config.reset,
    replaceConfig: config.replaceConfig,
    presets: presetsHook.presets,
    activePresetId: presetsHook.activePresetId,
    activePreset: presetsHook.activePreset,
    isModified,
    savePresetAs,
    loadPreset,
    updateActivePreset,
    deletePreset: presetsHook.deletePreset,
    renamePreset: presetsHook.renamePreset,
    duplicatePreset: presetsHook.duplicatePreset,
    clearActivePreset: presetsHook.clearActive,
    refreshKey,
    triggerRefresh,
  };

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
}

export function usePlayground(): PlaygroundContextValue {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) {
    throw new Error('usePlayground deve ser usado dentro de <PlaygroundProvider>');
  }
  return ctx;
}

export function usePlaygroundOptional(): PlaygroundContextValue | null {
  return useContext(PlaygroundContext);
}
