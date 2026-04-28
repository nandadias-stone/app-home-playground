import { Button, Card, Icon } from '@/jade';
import styles from './v1.module.css';

type CardMaquininhasProps = {
  total?: number;
  onGerenciar?: () => void;
};

export function CardMaquininhasV1({ total = 3, onGerenciar }: CardMaquininhasProps) {
  return (
    <Card padding="medium" className={styles.card}>
      <Icon name="device-mobile" size={20} color="var(--jade-content-brand)" />
      <span className={`${styles.label} jade-text-medium-semibold`}>
        Você possui{' '}
        <strong>{total} maquininhas</strong>
      </span>
      <Button variant="ghost" size="small" onClick={onGerenciar}>
        Gerenciar
      </Button>
    </Card>
  );
}
