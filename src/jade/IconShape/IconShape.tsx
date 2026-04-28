import { Icon, type IconName } from '../Icon';
import styles from './IconShape.module.css';

type IconShapeProps = {
  icon: IconName;
  variant?: 'positive-subtle' | 'brand-subtle' | 'neutral-subtle' | 'warning-subtle';
  size?: 'small' | 'medium' | 'large';
};

const ICON_SIZES = { small: 16, medium: 20, large: 24 };

export function IconShape({ icon, variant = 'positive-subtle', size = 'medium' }: IconShapeProps) {
  const classes = [styles.shape, styles[`variant-${variant}`], styles[`size-${size}`]].join(' ');
  return (
    <span className={classes}>
      <Icon name={icon} size={ICON_SIZES[size]} />
    </span>
  );
}
