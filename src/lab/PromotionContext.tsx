import { createContext, useContext, type ReactNode } from 'react';
import { usePromotionConfig, type PromotionActions } from './usePromotionConfig';

const PromotionContext = createContext<PromotionActions | null>(null);

export function PromotionProvider({ children }: { children: ReactNode }) {
  const value = usePromotionConfig();
  return <PromotionContext.Provider value={value}>{children}</PromotionContext.Provider>;
}

export function usePromotion(): PromotionActions {
  const ctx = useContext(PromotionContext);
  if (!ctx) {
    throw new Error('usePromotion deve ser usado dentro de <PromotionProvider>');
  }
  return ctx;
}

export function usePromotionOptional(): PromotionActions | null {
  return useContext(PromotionContext);
}
