import { Icon, IconButton } from '@/jade';
import styles from './Header.module.css';

type HeaderProps = {
  merchantName?: string;
  cnpj?: string;
  onTogglePrivacy?: () => void;
  onProfileClick?: () => void;
};

const DEFAULTS = {
  merchantName: 'Restaurante Brasil',
  cnpj: '24.091.781/0001-35',
};

export function Header({
  merchantName = DEFAULTS.merchantName,
  cnpj = DEFAULTS.cnpj,
  onTogglePrivacy,
  onProfileClick,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <button className={styles.merchantInfo} type="button">
        <span className={styles.nameRow}>
          <span className={`${styles.name} jade-heading-medium`}>{merchantName}</span>
          <Icon name="caret-down" size={20} />
        </span>
        <span className={`${styles.cnpj} jade-text-small-regular`}>{cnpj}</span>
      </button>
      <div className={styles.actions}>
        <IconButton
          icon="eye"
          variant="on-brand"
          size="medium"
          ariaLabel="Mostrar/esconder valores"
          onClick={onTogglePrivacy}
        />
        <IconButton
          icon="user"
          variant="on-brand"
          size="medium"
          ariaLabel="Perfil"
          onClick={onProfileClick}
        />
      </div>
    </header>
  );
}
