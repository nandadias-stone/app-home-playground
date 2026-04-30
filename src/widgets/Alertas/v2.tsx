import { useEffect, useRef, useState } from 'react';
import { Alert, Link } from '@/jade';
import { useDismissedAlerts } from './useDismissedAlerts';
import styles from './v2.module.css';

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

type AlertasV2Props = {
  alertas?: AlertaItem[];
  onAction?: (id: string) => void;
};

const DRAG_THRESHOLD = 5; // px de movimento pra começar a considerar drag

export function AlertasV2({ alertas = DEFAULT_ALERTAS, onAction }: AlertasV2Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isDismissed, dismiss, restoreAll } = useDismissedAlerts();
  const visiveis = alertas.filter((a) => !isDismissed(a.id));
  const dispensadosCount = alertas.length - visiveis.length;
  const dragState = useRef({
    pointerDown: false,
    pointerId: 0,
    startX: 0,
    startScroll: 0,
    moved: false,
  });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const handler = () => {
      const slides = Array.from(el.children) as HTMLElement[];
      if (slides.length === 0) return;
      const scrollMid = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((s, i) => {
        const center = s.offsetLeft + s.offsetWidth / 2;
        const dist = Math.abs(center - scrollMid);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    const target = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch já é tratado nativamente pelo overflow-x scroll. Drag manual só pra mouse/pen.
    if (e.pointerType === 'touch') return;
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = {
      pointerDown: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.classList.add(styles.grabbing!);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragState.current;
    const el = scrollerRef.current;
    if (!s.pointerDown || !el) return;
    const delta = e.clientX - s.startX;
    if (Math.abs(delta) > DRAG_THRESHOLD && !s.moved) {
      s.moved = true;
      el.setPointerCapture(s.pointerId);
    }
    if (s.moved) {
      el.scrollLeft = s.startScroll - delta;
      e.preventDefault();
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragState.current;
    const el = scrollerRef.current;
    if (!s.pointerDown) return;
    if (s.moved && el) {
      // Snap pro slide mais próximo
      const slides = Array.from(el.children) as HTMLElement[];
      const scrollMid = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((slide, i) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - scrollMid);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      goTo(closest);
    }
    if (el?.hasPointerCapture(s.pointerId)) {
      el.releasePointerCapture(s.pointerId);
    }
    el?.classList.remove(styles.grabbing!);
    dragState.current = { ...s, pointerDown: false, moved: false };
    // Bloqueia clique imediato se houve drag (evita disparar Link)
    if (s.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  };

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

  return (
    <div className={styles.wrap}>
      <div
        ref={scrollerRef}
        className={styles.scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        {visiveis.map((alerta) => (
          <div key={alerta.id} className={styles.slide}>
            <Alert
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
          </div>
        ))}
      </div>

      {visiveis.length > 1 && (
        <div className={styles.dots} role="tablist">
          {visiveis.map((alerta, i) => (
            <button
              key={alerta.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Ir para alerta ${i + 1}`}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
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
