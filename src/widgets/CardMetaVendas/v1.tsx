/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { Card, Icon, IconShape } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v1.module.css';

type CardMetaVendasProps = {
  faltam?: number;
  onClick?: () => void;
};

export function CardMetaVendasV1({ faltam = 20000, onClick }: CardMetaVendasProps) {
  return (
    <Card padding="medium" className={styles.card}>
      <button className={styles.btn} type="button" onClick={onClick}>
        <IconShape icon="currency-circle" variant="neutral-subtle" size="medium" />
        <div className={styles.body}>
          <p className={`${styles.title} jade-text-medium-semibold`}>Meta de vendas</p>
          <p className={`${styles.description} jade-text-small-regular`}>
            Venda mais{' '}
            <strong className={styles.highlight}>{formatBRL(faltam)}</strong> este mês e
            aproveite os benefícios!
          </p>
        </div>
        <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
      </button>
    </Card>
  );
}
