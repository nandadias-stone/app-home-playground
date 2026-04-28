import { type ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './IconButton.module.css';

type IconButtonProps = {
  icon: IconName;
  variant?: 'on-brand' | 'subtle' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  ariaLabel: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>;

const SIZES = { small: 16, medium: 20, large: 24 };

export function IconButton({
  icon,
  variant = 'subtle',
  size = 'medium',
  ariaLabel,
  className,
  ...rest
}: IconButtonProps) {
  const classes = [styles.button, styles[`variant-${variant}`], styles[`size-${size}`], className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <button className={classes} aria-label={ariaLabel} {...rest}>
      <Icon name={icon} size={SIZES[size]} />
    </button>
  );
}
