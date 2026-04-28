import { Switch } from '@/jade';
import { WIDGET_REGISTRY, type WidgetId } from '@/playground';
import { usePromotion } from './PromotionContext';
import styles from './VersionCard.module.css';

type VersionCardProps = {
  widgetId: WidgetId;
  version: string;
};

export function VersionCard({ widgetId, version }: VersionCardProps) {
  const entry = WIDGET_REGISTRY[widgetId];
  const Comp = entry.component;
  const { isPromoted, togglePromotion } = usePromotion();
  const promoted = isPromoted(widgetId, version);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.label}>{version}</span>
        <label className={styles.switchLabel}>
          <span className={`${styles.switchText} jade-text-small-medium`}>
            {promoted ? 'Disponível' : 'Oculto'}
          </span>
          <Switch
            checked={promoted}
            onChange={() => togglePromotion(widgetId, version)}
            ariaLabel={`Promover ${version} para o playground`}
          />
        </label>
      </header>

      <div className={styles.preview}>
        <div className={styles.frame}>
          <Comp version={version} />
        </div>
      </div>
    </article>
  );
}
