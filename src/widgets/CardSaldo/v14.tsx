import { Card, Icon, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v14.module.css';

type CardSaldoV14Props = {
  saldo?: number;
  serie7d?: number[];
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

const DEFAULT_SERIE = [4500, 4720, 4600, 4800, 5050, 4900, 5000];

function buildPath(values: number[], width: number, height: number): string {
  if (values.length < 2) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

export function CardSaldoV14({
  saldo = 5000,
  serie7d = DEFAULT_SERIE,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: CardSaldoV14Props) {
  const trend = serie7d[serie7d.length - 1] - serie7d[0];
  const isUp = trend >= 0;
  const trendPct = serie7d[0] !== 0 ? Math.abs((trend / serie7d[0]) * 100) : 0;
  const path = buildPath(serie7d, 100, 32);
  const strokeColor = isUp ? 'var(--jade-bg-positive)' : '#c4474c';

  return (
    <Card padding="none">
      <div className={styles.body}>
        <button className={styles.saldoBlock} type="button">
          <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
          <span className={styles.amountRow}>
            <span className={`${styles.amount} jade-heading-large`}>{formatBRL(saldo)}</span>
            <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
          </span>
        </button>

        <div className={styles.sparkRow}>
          <svg
            className={styles.spark}
            viewBox="0 0 100 32"
            width="100"
            height="32"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={path} fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`${styles.trend} jade-text-small-medium`} style={{ color: strokeColor }}>
            {isUp ? '↑' : '↓'} {trendPct.toFixed(1)}%
          </span>
          <span className={`${styles.trendMeta} jade-text-small-regular`}>últimos 7 dias</span>
        </div>
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
