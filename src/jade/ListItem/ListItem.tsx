import { type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './ListItem.module.css';

type ListItemProps = {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  trailingIcon?: IconName | null;
  onClick?: () => void;
  as?: 'div' | 'button';
};

export function ListItem({
  leading,
  title,
  subtitle,
  trailing,
  trailingIcon = 'chevron-right',
  onClick,
  as = onClick ? 'button' : 'div',
}: ListItemProps) {
  const Component = as as 'div' | 'button';
  return (
    <Component className={styles.item} onClick={onClick} {...(as === 'button' ? { type: 'button' as const } : {})}>
      {leading && <span className={styles.leading}>{leading}</span>}
      <span className={styles.body}>
        <span className={`${styles.title} jade-text-medium-medium`}>{title}</span>
        {subtitle && <span className={`${styles.subtitle} jade-text-small-regular`}>{subtitle}</span>}
      </span>
      {(trailing || trailingIcon) && (
        <span className={styles.trailing}>
          {trailing}
          {trailingIcon && <Icon name={trailingIcon} size={16} />}
        </span>
      )}
    </Component>
  );
}
