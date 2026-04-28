import { Button, Card, StatusTracker } from '@/jade';
import styles from './v1.module.css';

type CardCartaoTrackingProps = {
  title?: string;
  status?: string;
  steps?: number;
  current?: number;
  buttonLabel?: string;
  onConfirm?: () => void;
};

export function CardCartaoTrackingV1({
  title = 'Acompanhe seu cartão Stone',
  status = 'Seu cartão <type> está em produção',
  steps = 4,
  current = 1,
  buttonLabel = 'Recebi o cartão',
  onConfirm,
}: CardCartaoTrackingProps) {
  return (
    <Card padding="medium">
      <p className={`${styles.title} jade-text-medium-medium`}>{title}</p>
      <div className={styles.tracker}>
        <StatusTracker steps={steps} current={current} />
      </div>
      <p className={`${styles.status} jade-text-large-semibold`}>{status}</p>
      <Button
        variant="primary"
        size="medium"
        fullWidth
        className={styles.cta}
        onClick={onConfirm}
      >
        {buttonLabel}
      </Button>
    </Card>
  );
}
