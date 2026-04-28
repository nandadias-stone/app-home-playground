import { createContext, useContext, type ReactNode } from 'react';
import { usePlaygroundConfig, type PlaygroundActions } from './usePlaygroundConfig';

const PlaygroundContext = createContext<PlaygroundActions | null>(null);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const value = usePlaygroundConfig();
  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
}

export function usePlayground(): PlaygroundActions {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) {
    throw new Error('usePlayground deve ser usado dentro de <PlaygroundProvider>');
  }
  return ctx;
}

export function usePlaygroundOptional(): PlaygroundActions | null {
  return useContext(PlaygroundContext);
}
