import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'stone-dismissed-alerts';

function load(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function persist(set: Set<string>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // ignora
  }
}

export type DismissedAlertsActions = {
  isDismissed: (id: string) => boolean;
  dismiss: (id: string) => void;
  restoreAll: () => void;
  dismissedCount: number;
};

/**
 * Hook compartilhado entre as versões do componente Alertas.
 * Persiste IDs dispensados em localStorage para sobreviver a reload.
 *
 * Sincroniza entre instâncias do hook na mesma aba via storage event
 * e re-leitura ao montar — permite que dismiss em uma versão do Lab
 * reflita imediatamente em outras renderizações abertas na mesma página.
 */
export function useDismissedAlerts(): DismissedAlertsActions {
  const [dismissed, setDismissed] = useState<Set<string>>(() => load());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setDismissed(load());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isDismissed = useCallback((id: string) => dismissed.has(id), [dismissed]);

  const dismiss = useCallback((id: string) => {
    setDismissed((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      persist(next);
      return next;
    });
  }, []);

  const restoreAll = useCallback(() => {
    setDismissed(new Set());
    persist(new Set());
  }, []);

  return {
    isDismissed,
    dismiss,
    restoreAll,
    dismissedCount: dismissed.size,
  };
}
