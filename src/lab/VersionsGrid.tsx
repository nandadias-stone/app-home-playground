import { useMemo } from 'react';
import { WIDGET_REGISTRY, type WidgetId } from '@/playground';
import { usePromotion } from './PromotionContext';
import { VersionCard } from './VersionCard';
import styles from './VersionsGrid.module.css';

type VersionsGridProps = {
  widgetId: WidgetId;
};

export function VersionsGrid({ widgetId }: VersionsGridProps) {
  const entry = WIDGET_REGISTRY[widgetId];
  const { isPromoted } = usePromotion();

  const sortedVersions = useMemo(() => {
    return [...entry.versions].sort((a, b) => {
      const aP = isPromoted(widgetId, a) ? 1 : 0;
      const bP = isPromoted(widgetId, b) ? 1 : 0;
      if (aP !== bP) return bP - aP;
      return a.localeCompare(b);
    });
  }, [entry.versions, widgetId, isPromoted]);

  const promotedCount = sortedVersions.filter((v) => isPromoted(widgetId, v)).length;

  return (
    <section className={styles.grid}>
      <header className={styles.title}>
        <h1 className={styles.heading}>{entry.label}</h1>
        <p className={styles.summary}>
          {sortedVersions.length} {sortedVersions.length === 1 ? 'versão' : 'versões'} ·{' '}
          {promotedCount} disponível{promotedCount === 1 ? '' : 'is'} no playground
        </p>
      </header>

      {sortedVersions.length === 0 ? (
        <p className={styles.empty}>Nenhuma versão deste widget foi encontrada.</p>
      ) : (
        <div className={styles.cards}>
          {sortedVersions.map((version) => (
            <VersionCard key={version} widgetId={widgetId} version={version} />
          ))}
        </div>
      )}
    </section>
  );
}
