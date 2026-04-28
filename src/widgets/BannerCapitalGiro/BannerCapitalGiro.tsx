import { Link } from '@/jade';
import { MoneyStack } from '@/assets/illustrations/MoneyStack';
import styles from './BannerCapitalGiro.module.css';

type BannerCapitalGiroProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function BannerCapitalGiro({
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
