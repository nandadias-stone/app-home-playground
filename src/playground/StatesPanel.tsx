import { usePlayground } from './PlaygroundContext';
import { WIDGET_REGISTRY } from './widget-registry';
import styles from './StatesPanel.module.css';

export function StatesPanel() {
  const { config, setState } = usePlayground();

  const items = config.widgets
    .filter((w) => w.enabled)
    .map((w) => ({ w, entry: WIDGET_REGISTRY[w.id] }))
    .filter(({ entry, w }) => {
      // versão com estado forçado não tem escolha — esconde do painel
      if (entry.versionForcedState?.[w.version]) return false;
      return (entry.states?.length ?? 0) > 0;
    });

  if (items.length === 0) return null;

  return (
    <aside className={styles.panel} aria-label="Estados dos widgets">
      <h3 className={styles.title}>Estados</h3>
      <div className={styles.list}>
        {items.map(({ w, entry }) => {
          const states = entry.states!;
          const active = w.state ?? states[0].id;
          return (
            <div key={w.id} className={styles.row}>
              <span className={`${styles.widgetName} jade-text-small-medium`}>
                {entry.label}
              </span>
              <div className={styles.segments} role="radiogroup" aria-label={entry.label}>
                {states.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      className={styles.segment}
                      data-active={isActive}
                      onClick={() => setState(w.id, s.id)}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
