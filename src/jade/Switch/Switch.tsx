import { type InputHTMLAttributes } from 'react';
import styles from './Switch.module.css';

type SwitchProps = {
  ariaLabel?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Switch({ checked, onChange, ariaLabel, className, ...rest }: SwitchProps) {
  const classes = [styles.switch, className ?? ''].filter(Boolean).join(' ');
  return (
    <label className={classes} aria-label={ariaLabel}>
      <input type="checkbox" checked={checked} onChange={onChange} {...rest} />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
    </label>
  );
}
