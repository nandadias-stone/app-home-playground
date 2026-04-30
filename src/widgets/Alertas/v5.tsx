import { useState } from 'react';
import { Alert, Icon, Link } from '@/jade';
import { useDismissedAlerts } from './useDismissedAlerts';
import styles from './v5.module.css';

type AlertaItem = {
  id: string;
  variant: 'warning' | 'info';
  title: string;
  description: string;
  actionLabel?: string;
};

const DEFAULT_ALERTAS: AlertaItem[] = [
  {
    id: 'dispositivo',
    variant: 'warning',
    title: 'Cadastre seu dispositivo principal',
    description:
      'Somente o dispositivo principal pode autorizar ou recusar acessos à sua conta.',
    actionLabel: 'Cadastrar',
  },
  {
    id: 'pix-na-maquininha',
    variant: 'info',
    title: 'Ative o Pix na maquininha',
    description: 'Receba pagamentos por Pix sem taxa direto na sua maquininha Stone.',
    actionLabel: 'Ativar agora',
  },
  {
    id: 'antecipacao',
    variant: 'info',
    title: 'R$ 87.654 disponíveis pra antecipar',
    description: 'Antecipe suas vendas a receber e tenha o dinheiro hoje na sua conta.',
    actionLabel: 'Ver oferta',
  },
];

type AlertasV5Props = {
  alertas?: AlertaItem[];
  onAction?: (id: string) => void;
};

export function AlertasV5({ alertas = DEFAULT_ALERTAS, onAction }: AlertasV5Props) {
  const [expanded, setExpanded] = useState(false);
  const { isDismissed, dismiss, restoreAll } = useDismissedAlerts();
  const visiveis = alertas.filter((a) => !isDismissed(a.id));
  const dispensadosCount = alertas.length - visiveis.length;

  if (visiveis.length === 0 && dispensadosCount > 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyText}>Todos os alertas foram dispensados.</span>
        <button type="button" className={styles.restoreLink} onClick={restoreAll}>
          Restaurar
        </button>
      </div>
    );
  }
  if (visiveis.length === 0) return null;

  const principalIndex = Math.max(
    0,
    visiveis.findIndex((a) => a.variant === 'warning'),
  );
  const principal = visiveis[principalIndex];
  const restantes = visiveis.length - 1;

  if (expanded || visiveis.length === 1) {
    return (
      <div className={styles.expanded}>
        {visiveis.length > 1 && (
          <button
            type="button"
            className={styles.collapseTrigger}
            onClick={() => setExpanded(false)}
          >
            <Icon name="chevron-down" size={16} />
            <span className={styles.collapseLabel}>Ocultar</span>
          </button>
        )}
        {visiveis.map((alerta) => (
          <Alert
            key={alerta.id}
            variant={alerta.variant}
            icon={alerta.variant === 'warning' ? 'warning-triangle' : 'info'}
            title={alerta.title}
            description={alerta.description}
            onDismiss={() => dismiss(alerta.id)}
            action={
              alerta.actionLabel ? (
                <Link
                  variant="brand"
                  trailingIcon="chevron-right"
                  onClick={() => onAction?.(alerta.id)}
                >
                  {alerta.actionLabel}
                </Link>
              ) : undefined
            }
          />
        ))}
        {dispensadosCount > 0 && (
          <button type="button" className={styles.restoreLink} onClick={restoreAll}>
            Restaurar {dispensadosCount}{' '}
            {dispensadosCount === 1 ? 'alerta dispensado' : 'alertas dispensados'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.collapsedWrap}>
      <button
        type="button"
        className={`${styles.compact} ${styles[`variant-${principal.variant}`]}`}
        onClick={() => setExpanded(true)}
      >
        <span className={styles.icon}>
          <Icon
            name={principal.variant === 'warning' ? 'warning-triangle' : 'info'}
            size={20}
          />
        </span>
        <span className={styles.body}>
          <span className={`${styles.title} jade-text-medium-semibold`}>{principal.title}</span>
          {restantes > 0 && (
            <span className={`${styles.meta} jade-text-small-regular`}>
              +{restantes} {restantes === 1 ? 'outro alerta' : 'outros alertas'}
            </span>
          )}
        </span>
        <span
          className={styles.dismiss}
          role="button"
          tabIndex={0}
          aria-label="Dispensar alerta"
          onClick={(e) => {
            e.stopPropagation();
            dismiss(principal.id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              dismiss(principal.id);
            }
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 3l8 8M11 3l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className={styles.chevron}>
          <Icon name="chevron-right" size={16} />
        </span>
      </button>
      {dispensadosCount > 0 && (
        <button type="button" className={styles.restoreLink} onClick={restoreAll}>
          Restaurar {dispensadosCount}{' '}
          {dispensadosCount === 1 ? 'alerta dispensado' : 'alertas dispensados'}
        </button>
      )}
    </div>
  );
}
