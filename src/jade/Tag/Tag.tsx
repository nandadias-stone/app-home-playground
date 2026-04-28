import { type ReactNode } from 'react';
import styles from './Tag.module.css';

type TagProps = {
  variant?: 'neutral' | 'positive' | 'warning' | 'info' | 'brand';
  size?: 'small' | 'medium';
  children: ReactNode;
};

export function Tag({ variant = 'neutral', size = 'medium', children }: TagProps) {
  const classes = [styles.tag, styles[`variant-${variant}`], styles[`size-${size}`]].join(' ');
  return <span className={classes}>{children}</span>;
}
