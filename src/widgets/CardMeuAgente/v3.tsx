import { Card, Icon } from '@/jade';
import consultorImg from '@/assets/images/consultor.png';
import styles from './v3.module.css';

type CardMeuAgenteV3Props = {
  nomeCliente?: string;
  titulo?: string;
  descricao?: string;
  badgeCount?: number;
  onClick?: () => void;
};

export function CardMeuAgenteV3({
  nomeCliente = 'Joaquina',
  titulo = 'Tenho um recado pra você!',
  descricao,
  badgeCount = 1,
  onClick,
}: CardMeuAgenteV3Props) {
  const fallbackDescricao = `${nomeCliente}, separei algumas novidades especiais pra você acompanhar.`;
  const descricaoFinal = descricao
    ? descricao.replace('{Cliente}', nomeCliente)
    : fallbackDescricao;

  return (
    <Card padding="medium" className={styles.card}>
      <button type="button" className={styles.btn} onClick={onClick}>
        <span className={styles.avatarWrap}>
          <img
            src={consultorImg}
            alt=""
            className={styles.avatar}
            width={48}
            height={48}
          />
          {badgeCount > 0 && (
            <span className={styles.badge} aria-label={`${badgeCount} nova mensagem`}>
              {badgeCount > 9 ? '9+' : badgeCount}
            </span>
          )}
        </span>
        <span className={styles.body}>
          <span className={`${styles.titulo} jade-text-large-semibold`}>{titulo}</span>
          <span className={`${styles.descricao} jade-text-small-regular`}>
            {descricaoFinal}
          </span>
        </span>
        <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
      </button>
    </Card>
  );
}
