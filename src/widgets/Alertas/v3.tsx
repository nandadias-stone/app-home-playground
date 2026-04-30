import { useEffect, useState } from 'react';
import { Alert, Icon, Link } from '@/jade';
import { useDismissedAlerts } from './useDismissedAlerts';
import styles from './v3.module.css';

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

type AlertasV3Props = {
  alertas?: AlertaItem[];
  onAction?: (id: string) => void;
};

export function AlertasV3({ alertas = DEFAULT_ALERTAS, onAction }: AlertasV3Props) {
  const { isDismissed, dismiss, restoreAll } = useDismissedAlerts();
  const visiveis = alertas.filter((a) => !isDismissed(a.id));
  const dispensadosCount = alertas.length - visiveis.length;
  const total = visiveis.length;
  const [activeIndex, setActiveIndex] = useState(0);

  // Mantém activeIndex válido quando uma versão é dispensada
  useEffect(() => {
    if (activeIndex >= total && total > 0) setActiveIndex(total - 1);
  }, [activeIndex, total]);

  if (total === 0 && dispensadosCount > 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyText}>Todos os alertas foram dispensados.</span>
        <button type="button" className={styles.restoreLink} onClick={restoreAll}>
          Restaurar
        </button>
      </div>
    );
  }
  if (total === 0) return null;

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <div className={styles.wrap}>
      {/* Renderiza todos no mesmo grid cell pra manter altura constante */}
      <div className={styles.alertWrap}>
        {visiveis.map((alerta, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={alerta.id}
              className={`${styles.layer} ${isActive ? styles.layerActive : ''}`}
              aria-hidden={!isActive}
            >
              <Alert
                variant={alerta.variant}
                icon={alerta.variant === 'warning' ? 'warning-triangle' : 'info'}
                title={alerta.title}
                description={alerta.description}
                onDismiss={isActive ? () => dismiss(alerta.id) : undefined}
                action={
                  alerta.actionLabel ? (
                    <Link
                      variant="brand"
                      trailingIcon="chevron-right"
                      onClick={isActive ? () => onAction?.(alerta.id) : undefined}
                      tabIndex={isActive ? 0 : -1}
                    >
                      {alerta.actionLabel}
                    </Link>
                  ) : undefined
                }
              />
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            onClick={prev}
            aria-label="Alerta anterior"
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <div className={styles.dots} role="tablist">
            {visiveis.map((a, i) => (
              <button
                key={a.id}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Alerta ${i + 1} de ${total}`}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.navButton}
            onClick={next}
            aria-label="Próximo alerta"
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      )}

      {dispensadosCount > 0 && (
        <button type="button" className={styles.restoreLink} onClick={restoreAll}>
          Restaurar {dispensadosCount}{' '}
          {dispensadosCount === 1 ? 'alerta dispensado' : 'alertas dispensados'}
        </button>
      )}
    </div>
  );
}
