import { Icon } from '@/jade';
import { CopilotMark } from '@/assets/illustrations/CopilotMark';
import styles from './CardCopiloto.module.css';

type CardCopilotoProps = {
  title?: string;
  onClick?: () => void;
};

export function CardCopiloto({
  title = 'O novo copiloto do seu negócio',
  onClick,
}: CardCopilotoProps) {
  return (
    <button className={styles.card} onClick={onClick} type="button">
      <span className={styles.markWrap}>
        <CopilotMark size={20} />
      </span>
      <span className={`${styles.title} jade-text-large-semibold`}>{title}</span>
      <span className={styles.chevron}>
        <Icon name="chevron-right" size={20} color="var(--jade-content-on-brand-high)" />
      </span>
    </button>
  );
}
