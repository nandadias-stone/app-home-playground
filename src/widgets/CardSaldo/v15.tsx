import { Card, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v15.module.css';

type Props = {
  saldo?: number;
  serie?: number[];
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

const DEFAULT_SERIE = [4350, 4420, 4310, 4580, 4720, 4890, 5000];

function buildPath(data: number[], w: number, h: number, pad: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = (w - pad * 2) / (data.length - 1);
  const points = data.map<[number, number]>((v, i) => [
    pad + i * stepX,
    h - pad - ((v - min) / range) * (h - pad * 2),
  ]);
  const line = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');
  const area = `${line} L${(w - pad).toFixed(1)},${(h - pad).toFixed(1)} L${pad.toFixed(1)},${(h - pad).toFixed(1)} Z`;
  return { line, area };
}

export function CardSaldoV15({
  saldo = 5000,
  serie = DEFAULT_SERIE,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: Props) {
  const w = 296;
  const h = 56;
  const { line, area } = buildPath(serie, w, h, 4);
  const delta = ((serie[serie.length - 1] - serie[0]) / Math.abs(serie[0])) * 100;
  const isUp = delta >= 0;
  const trendColor = isUp
    ? 'var(--jade-content-positive, #1f8c4e)'
    : 'var(--jade-content-negative, #c4474c)';

  return (
    <Card padding="none">
      <div className={styles.block}>
        <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
        <span className={`${styles.amount} jade-heading-large`}>{formatBRL(saldo)}</span>
        <span className={styles.delta} data-up={isUp}>
          {isUp ? '↑' : '↓'} {Math.abs(delta).toFixed(1)}% nos últimos 7 dias
        </span>
        <svg
          className={styles.sparkline}
          width="100%"
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="spark15" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={trendColor} stopOpacity="0.22" />
              <stop offset="100%" stopColor={trendColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#spark15)" />
          <path
            d={line}
            stroke={trendColor}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
