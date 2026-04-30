import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_ORDER, WIDGET_REGISTRY, type WidgetId } from '@/playground';

const STORAGE_KEY = 'stone-lab-active-widget';

function load(): WidgetId {
  if (typeof window === 'undefined') return DEFAULT_ORDER[0];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored in WIDGET_REGISTRY) {
      return stored as WidgetId;
    }
  } catch {
    // ignora
  }
  return DEFAULT_ORDER[0];
}

/**
 * Lembra qual widget estava aberto no Lab entre sessões. Persiste em localStorage.
 */
export function useActiveWidget(): [WidgetId, (id: WidgetId) => void] {
  const [activeId, setActiveIdState] = useState<WidgetId>(() => load());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, activeId);
    } catch {
      // ignora
    }
  }, [activeId]);

  const setActiveId = useCallback((id: WidgetId) => {
    setActiveIdState(id);
  }, []);

  return [activeId, setActiveId];
}
