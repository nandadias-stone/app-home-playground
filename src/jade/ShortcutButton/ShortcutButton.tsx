import { type ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './ShortcutButton.module.css';

type ShortcutButtonProps = {
  icon: IconName;
  label: string;
  badge?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ShortcutButton({ icon, label, badge, className, ...rest }: ShortcutButtonProps) {
  const classes = [styles.shortcut, className ?? ''].filter(Boolean).join(' ');
  return (
    <button className={classes} {...rest}>
      <span className={styles.iconWrap}>
        <Icon name={icon} size={20} />
        {badge && <span className={styles.badge}>{badge}</span>}
      </span>
      <span className={`${styles.label} jade-text-medium-medium`}>{label}</span>
    </button>
  );
}
