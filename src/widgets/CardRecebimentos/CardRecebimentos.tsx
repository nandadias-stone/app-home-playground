import { Card, Divider, Icon, Link } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './CardRecebimentos.module.css';

type DiaRecebimento = {
  dia: number;
  label: string;
  highlight?: boolean;
  valor: number;
};

type CardRecebimentosProps = {
  recebimentosMes?: number;
  futuros?: number;
  dias?: DiaRecebimento[];
  onAntecipacao?: () => void;
};

const DEFAULT_DIAS: DiaRecebimento[] = [
  { dia: 10, label: 'hoje', highlight: true, valor: 1113.58 },
  { dia: 11, label: 'qua', valor: 3071.19 },
];

export function CardRecebimentos({
  recebimentosMes = 87654.32,
  futuros = 3542.05,
  dias = DEFAULT_DIAS,
  onAntecipacao,
}: CardRecebimentosProps) {
  return (
    <Card padding="none">
      <button className={styles.headerBlock} type="button">
        <div className={styles.column}>
          <span className={`${styles.label} jade-text-medium-regular`}>Recebimentos do mês</span>
          <span className={`${styles.amount} jade-heading-medium`}>{formatBRL(recebimentosMes)}</span>
        </div>
        <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
      </button>

      <Divider />

      <div className={styles.futurosBlock}>
        <div className={styles.column}>
          <span className={`${styles.label} jade-text-medium-regular`}>Recebimentos futuros</span>
          <span className={`${styles.amount} jade-heading-medium`}>{formatBRL(futuros)}</span>
        </div>
        <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
      </div>

      <div className={styles.dias}>
        {dias.map((d) => (
          <div key={d.dia} className={styles.diaCard}>
            <div className={`${styles.diaBox} ${d.highlight ? styles.diaBoxHighlight : ''}`}>
              <span className={styles.diaNum}>{d.dia}</span>
              <span className={styles.diaLabel}>{d.label}</span>
            </div>
            <div className={styles.diaInfo}>
              <span className={`${styles.diaValor} jade-text-medium-semibold`}>{formatBRL(d.valor)}</span>
              {d.dia === 10 && (
                <span className={`${styles.diaSecondary} jade-text-small-regular`}>R$ 470,86</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <button className={styles.antecipBlock} type="button" onClick={onAntecipacao}>
        <Icon name="calendar" size={20} color="var(--jade-content-high)" />
        <div className={styles.column}>
          <span className={`${styles.antecipTitle} jade-text-medium-medium`}>Antecipação</span>
          <span className={`${styles.label} jade-text-small-regular`}>Antecipe suas vendas</span>
        </div>
        <Link variant="brand" trailingIcon={null}>Conferir</Link>
      </button>
    </Card>
  );
}
