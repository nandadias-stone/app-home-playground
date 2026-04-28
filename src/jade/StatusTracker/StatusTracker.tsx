import { Icon } from '../Icon';
import styles from './StatusTracker.module.css';

type StatusTrackerProps = {
  steps: number;
  current: number;
};

export function StatusTracker({ steps, current }: StatusTrackerProps) {
  return (
    <div className={styles.tracker}>
      {Array.from({ length: steps }).map((_, i) => {
        const isCompleted = i < current;
        const isCurrent = i === current;
        const stepClass = [
          styles.step,
          isCompleted ? styles.completed : '',
          isCurrent ? styles.current : '',
        ].join(' ');
        return (
          <div key={i} className={styles.stepWrap}>
            <div className={stepClass}>
              {isCompleted && <Icon name="check" size={14} color="#fff" />}
              {isCurrent && <span className={styles.dot} />}
            </div>
            {i < steps - 1 && (
              <div className={`${styles.connector} ${isCompleted ? styles.connectorActive : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
