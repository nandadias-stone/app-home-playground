/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { Link } from '@/jade';
import { MoneyStack } from '@/assets/illustrations/MoneyStack';
import styles from './v1.module.css';

type BannerCapitalGiroProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function BannerCapitalGiroV1({
  title = 'Capital de Giro',
  description = 'Peça até R$ 25.000,00 pra crescer o seu negócio',
  actionLabel = 'Conferir oferta',
  onAction,
}: BannerCapitalGiroProps) {
  return (
    <button className={styles.banner} type="button" onClick={onAction}>
      <div className={styles.text}>
        <p className={`${styles.title} jade-heading-xsmall`}>{title}</p>
        <p className={`${styles.description} jade-text-medium-regular`}>{description}</p>
        <Link variant="on-brand" trailingIcon="chevron-right">
          {actionLabel}
        </Link>
      </div>
      <div className={styles.illustration} aria-hidden="true">
        <MoneyStack size={120} />
      </div>
    </button>
  );
}
