import { useCallback, useEffect, useState } from 'react';
import {
  ensureBooted,
  readSlice,
  subscribe,
  writeSlice,
} from './playgroundStateClient';

/**
 * Hook análogo ao useState, mas persiste em `playground-state.json` via plugin Vite.
 * Antes do boot, retorna `initial`. Após o boot, retorna o valor do arquivo (ou `initial` se
 * a chave nunca foi escrita).
 *
 * O `sanitize` é chamado em qualquer valor lido do arquivo, garantindo que mudanças
 * de schema não causem crashes.
 */
export function useFileBackedState<T>(
  key: string,
  initial: T,
  sanitize?: (raw: unknown, fallback: T) => T,
): [T, (next: T) => void] {
  const compute = (raw: unknown): T => {
    if (raw === undefined) return initial;
    if (sanitize) return sanitize(raw, initial);
    return raw as T;
  };

  const [value, setValueState] = useState<T>(() => compute(readSlice<unknown>(key)));

  useEffect(() => {
    let cancelled = false;
    ensureBooted().then(() => {
      if (cancelled) return;
      setValueState(compute(readSlice<unknown>(key)));
    });
    const unsub = subscribe(key, (slice) => {
      if (cancelled) return;
      setValueState(compute(slice));
    });
    return () => {
      cancelled = true;
      unsub();
    };
    // `key` muda só por refactor; sanitize é estável (def no escopo do hook).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    (next: T) => {
      writeSlice(key, next);
      setValueState(next);
    },
    [key],
  );

  return [value, setValue];
}
