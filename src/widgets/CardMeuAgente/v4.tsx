import consultorImg from '@/assets/images/consultor.png';
import styles from './v4.module.css';

type CardMeuAgenteV4Props = {
  badgeCount?: number;
  onClick?: () => void;
};

export function CardMeuAgenteV4({ badgeCount = 1, onClick }: CardMeuAgenteV4Props) {
  return (
    <button
      type="button"
      className={styles.bubble}
      onClick={onClick}
      aria-label="Abrir mensagens do consultor"
    >
      <img
        src={consultorImg}
        alt=""
        className={styles.avatar}
        width={56}
        height={56}
      />
      {badgeCount > 0 && (
        <span className={styles.badge} aria-label={`${badgeCount} nova mensagem`}>
          {badgeCount > 9 ? '9+' : badgeCount}
        </span>
      )}
    </button>
  );
}
