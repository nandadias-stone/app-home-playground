import { Card, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v18.module.css';

type Props = {
  saldo?: number;
  meta?: number;
  metaLegenda?: string;
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

export function CardSaldoV18({
  saldo = 5000,
  meta = 8000,
  metaLegenda = 'Meta de reserva',
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: Props) {
  const pct = Math.max(0, Math.min(saldo / meta, 1));
  const r = 64;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  const remaining = c - dash;

  return (
    <Card padding="none">
      <div className={styles.block}>
        <div className={styles.ringWrap}>
          <svg
            className={styles.ring}
            width="180"
            height="180"
            viewBox="0 0 180 180"
            aria-hidden="true"
          >
            <circle
              cx="90"
              cy="90"
              r={r}
              stroke="var(--jade-bg-neutral-subtle, #f1f3f5)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="90"
              cy="90"
              r={r}
              stroke="var(--jade-bg-brand)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${dash.toFixed(2)} ${remaining.toFixed(2)}`}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
            />
          </svg>
          <div className={styles.ringCenter}>
            <span className={`${styles.amount} jade-heading-medium`}>{formatBRL(saldo)}</span>
            <span className={styles.metaText}>de {formatBRL(meta)}</span>
            <span className={styles.pctBadge}>{Math.round(pct * 100)}%</span>
          </div>
        </div>
        <span className={`${styles.legenda} jade-text-small-regular`}>{metaLegenda}</span>
      </div>
      <div className={styles.shortcuts}>
        <ShortcutButton icon="pix" label="Pix" onClick={onPix} />
        <ShortcutButton icon="arrows-left-right" label="Transferir" onClick={onTransferir} />
        <ShortcutButton icon="qr-code" label="Pagar" onClick={onPagar} />
        <ShortcutButton icon="currency-dollar" label="Vender" onClick={onVender} />
      </div>
    </Card>
  );
}
