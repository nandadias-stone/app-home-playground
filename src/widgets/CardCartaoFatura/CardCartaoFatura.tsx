import { Card, Icon, Tag } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './CardCartaoFatura.module.css';

type CardCartaoFaturaProps = {
  valor?: number;
  fechaEm?: string;
  limite?: number;
  status?: 'aberta' | 'fechada';
  onClick?: () => void;
};

export function CardCartaoFatura({
  valor = 0,
  fechaEm = 'dd mmm',
  limite = 0,
  status = 'aberta',
  onClick,
}: CardCartaoFaturaProps) {
  return (
    <Card padding="medium">
      <button className={styles.head} type="button" onClick={onClick}>
        <div className={styles.column}>
          <span className={`${styles.label} jade-text-medium-regular`}>Valor a pagar do cartão</span>
          <span className={`${styles.amount} jade-heading-medium`}>{formatBRL(valor)}</span>
        </div>
        <div className={styles.headRight}>
          <Tag variant="positive">Fatura {status}</Tag>
          <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
        </div>
      </button>

      <div className={styles.metaRow}>
        <Icon name="calendar" size={16} color="var(--jade-content-medium)" />
        <span className={`${styles.meta} jade-text-small-regular`}>Fecha em {fechaEm}</span>
      </div>
      <div className={styles.metaRow}>
        <Icon name="currency-circle" size={16} color="var(--jade-content-medium)" />
        <span className={`${styles.meta} jade-text-small-regular`}>
          Limite disponível{' '}
          <strong className={styles.limiteHighlight}>{formatBRL(limite)}</strong>
        </span>
      </div>
    </Card>
  );
}
