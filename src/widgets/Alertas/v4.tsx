import { useRef, useState } from 'react';
import { Alert, Link } from '@/jade';
import { useDismissedAlerts } from './useDismissedAlerts';
import styles from './v4.module.css';

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

const SWIPE_THRESHOLD = 80;
const PEEK_OFFSET = 14;
const VISIBLE_DEPTH = 3;
const SIDE_INSET = 8;

type AlertasV4Props = {
  alertas?: AlertaItem[];
  onAction?: (id: string) => void;
};

export function AlertasV4({ alertas = DEFAULT_ALERTAS, onAction }: AlertasV4Props) {
  const { isDismissed, dismiss, restoreAll } = useDismissedAlerts();
  const visiveis = alertas.filter((a) => !isDismissed(a.id));
  const dispensadosCount = alertas.length - visiveis.length;

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [animOutDir, setAnimOutDir] = useState<'left' | 'right' | null>(null);
  const dismissingIdRef = useRef<string | null>(null);
  const startXRef = useRef<number | null>(null);

  const finishDismiss = () => {
    if (dismissingIdRef.current) {
      dismiss(dismissingIdRef.current);
      dismissingIdRef.current = null;
    }
    setDragX(0);
    setAnimOutDir(null);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (visiveis.length === 0 || animOutDir) return;
    startXRef.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startXRef.current == null) return;
    setDragX(e.clientX - startXRef.current);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    startXRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (Math.abs(dragX) >= SWIPE_THRESHOLD && visiveis[0]) {
      dismissingIdRef.current = visiveis[0].id;
      setAnimOutDir(dragX < 0 ? 'left' : 'right');
      setTimeout(finishDismiss, 240);
    } else {
      setDragX(0);
    }
  };

  const frontTransform = animOutDir
    ? `translateX(${animOutDir === 'left' ? -480 : 480}px) rotate(${animOutDir === 'left' ? -8 : 8}deg)`
    : `translateX(${dragX}px) rotate(${dragX / 24}deg)`;

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

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        {visiveis.slice(0, VISIBLE_DEPTH).map((alerta, depth) => {
          const isFront = depth === 0;
          const peek = depth * PEEK_OFFSET;
          const sideInset = depth * SIDE_INSET;

          const baseStyle: React.CSSProperties = {
            zIndex: VISIBLE_DEPTH - depth,
          };

          const style: React.CSSProperties = isFront
            ? {
                ...baseStyle,
                transform: frontTransform,
                transition: isDragging
                  ? 'none'
                  : 'transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
                touchAction: 'pan-y',
                cursor: visiveis.length > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              }
            : {
                ...baseStyle,
                transform: `translateY(${peek}px)`,
                marginLeft: sideInset,
                marginRight: sideInset,
                transition: 'transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
              };

          return (
            <div
              key={alerta.id}
              className={styles.card}
              style={style}
              {...(isFront
                ? {
                    onPointerDown,
                    onPointerMove,
                    onPointerUp,
                    onPointerCancel: onPointerUp,
                  }
                : {})}
            >
              <Alert
                variant={alerta.variant}
                icon={alerta.variant === 'warning' ? 'warning-triangle' : 'info'}
                title={alerta.title}
                description={alerta.description}
                onDismiss={isFront ? () => dismiss(alerta.id) : undefined}
                action={
                  alerta.actionLabel ? (
                    <Link
                      variant="brand"
                      trailingIcon="chevron-right"
                      onClick={isFront ? () => onAction?.(alerta.id) : undefined}
                      tabIndex={isFront ? 0 : -1}
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

      {visiveis.length > 1 && (
        <p className={styles.counter}>
          {visiveis.length - 1}{' '}
          {visiveis.length - 1 === 1 ? 'alerta' : 'alertas'} aguardando · arraste para
          dispensar
        </p>
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
