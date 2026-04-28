import { Card, Icon } from '@/jade';
import consultorImg from '@/assets/images/consultor.png';
import styles from './CardMeuAgente.module.css';

type CardMeuAgenteProps = {
  cargo?: string;
  nome?: string;
  descricao?: string;
  onClick?: () => void;
};

export function CardMeuAgente({
  cargo = 'Consultor Stone',
  nome = 'Marcos S.',
  descricao = 'Atendimento personalizado disponível de segunda a sexta, em horário comercial.',
  onClick,
}: CardMeuAgenteProps) {
  return (
    <Card padding="medium" className={styles.card}>
      <button className={styles.btn} type="button" onClick={onClick}>
        <img src={consultorImg} alt={nome} className={styles.avatar} width={56} height={56} />
        <div className={styles.body}>
          <span className={`${styles.cargo} jade-text-small-regular`}>{cargo}</span>
          <span className={`${styles.nome} jade-heading-xsmall`}>{nome}</span>
          <span className={`${styles.descricao} jade-text-small-regular`}>{descricao}</span>
        </div>
        <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
      </button>
    </Card>
  );
}
