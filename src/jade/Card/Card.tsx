import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Card.module.css';

type CardProps = {
  variant?: 'surface' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Card({
  variant = 'surface',
  padding = 'medium',
  children,
  className,
  ...rest
}: CardProps) {
  const classes = [
    styles.card,
    styles[`variant-${variant}`],
    styles[`padding-${padding}`],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
