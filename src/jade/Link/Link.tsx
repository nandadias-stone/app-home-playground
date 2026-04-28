import { type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './Link.module.css';

type LinkProps = {
  variant?: 'brand' | 'on-brand' | 'neutral';
  size?: 'small' | 'medium';
  trailingIcon?: IconName | null;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Link({
  variant = 'brand',
  size = 'medium',
  trailingIcon = 'chevron-right',
  children,
  className,
  href = '#',
  ...rest
}: LinkProps) {
  const classes = [styles.link, styles[`variant-${variant}`], styles[`size-${size}`], className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <a className={classes} href={href} {...rest}>
      <span>{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={size === 'small' ? 14 : 16} />}
    </a>
  );
}
