import { type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './Alert.module.css';

type AlertProps = {
  variant?: 'neutral' | 'warning' | 'info' | 'positive';
  icon?: IconName;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  /** Se passado, renderiza um botão X que dispara essa função ao clicar */
  onDismiss?: () => void;
  /** Label acessível do botão dismiss. Default: "Dispensar alerta" */
  dismissLabel?: string;
};

const DEFAULT_ICON: Record<NonNullable<AlertProps['variant']>, IconName> = {
  neutral: 'info',
  warning: 'warning-triangle',
  info: 'info',
  positive: 'check-circle',
};

export function Alert({
  variant = 'neutral',
  icon,
  title,
  description,
  action,
  onDismiss,
  dismissLabel = 'Dispensar alerta',
}: AlertProps) {
  const iconName = icon ?? DEFAULT_ICON[variant];
  const classes = [styles.alert, styles[`variant-${variant}`]].join(' ');

  return (
    <div className={classes} role="status">
      <span className={styles.icon}>
        <Icon name={iconName} size={20} />
      </span>
      <div className={styles.body}>
        {title && <p className={`${styles.title} jade-text-medium-semibold`}>{title}</p>}
        {description && (
          <p className={`${styles.description} jade-text-medium-regular`}>{description}</p>
        )}
        {action && <div className={styles.action}>{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label={dismissLabel}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 3l8 8M11 3l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
