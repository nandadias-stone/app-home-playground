import { Card, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v16.module.css';

type Props = {
  saldo?: number;
  serie?: number[];
  dayLabels?: string[];
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

const DEFAULT_SERIE = [4350, 4420, 4310, 4580, 4720, 4890, 5000];
const DEFAULT_DAYS = ['Q', 'S', 'D', 'S', 'T', 'Q', 'H'];

export function CardSaldoV16({
  saldo = 5000,
  serie = DEFAULT_SERIE,
  dayLabels = DEFAULT_DAYS,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: Props) {
  const max = Math.max(...serie);
  return (
    <Card padding="none">
      <div className={styles.block}>
        <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
        <span className={`${styles.amount} jade-heading-large`}>{formatBRL(saldo)}</span>
        <div className={styles.bars}>
          {serie.map((v, i) => {
            const pct = (v / max) * 100;
            const isLast = i === serie.length - 1;
            return (
              <div key={i} className={styles.barCol}>
                <div className={styles.barTrack}>
                  <div
                    className={styles.bar}
                    style={{ height: `${pct}%` }}
                    data-current={isLast}
                  />
                </div>
                <span className={styles.dayLabel}>{dayLabels[i] ?? ''}</span>
              </div>
            );
          })}
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
