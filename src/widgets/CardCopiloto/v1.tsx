/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { Icon } from '@/jade';
import { CopilotMark } from '@/assets/illustrations/CopilotMark';
import styles from './v1.module.css';

type CardCopilotoProps = {
  title?: string;
  onClick?: () => void;
};

export function CardCopilotoV1({
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
