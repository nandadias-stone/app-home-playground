import { WIDGET_REGISTRY, DEFAULT_ORDER, type WidgetId } from '@/playground';
import { usePromotion } from './PromotionContext';
import styles from './LabSidebar.module.css';

type LabSidebarProps = {
  activeId: WidgetId;
  onSelect: (id: WidgetId) => void;
};

export function LabSidebar({ activeId, onSelect }: LabSidebarProps) {
  const { getPromotedVersions } = usePromotion();

  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <h2 className={styles.title}>Lab</h2>
        <p className={styles.subtitle}>Versões dos widgets</p>
        <a href="/playground" className={styles.backLink}>
          ← Playground
        </a>
      </header>

      <ul className={styles.list}>
        {DEFAULT_ORDER.map((id) => {
          const entry = WIDGET_REGISTRY[id];
          const total = entry.versions.length;
          const promoted = getPromotedVersions(id).length;
          const isActive = id === activeId;
          return (
            <li key={id}>
              <button
                type="button"
                className={`${styles.item} ${isActive ? styles.active : ''}`}
                onClick={() => onSelect(id)}
              >
                <span className={styles.label}>{entry.label}</span>
                <span className={styles.badge}>
                  {promoted}/{total}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
