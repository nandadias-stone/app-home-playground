import { Card, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v17.module.css';

type Props = {
  saldo?: number;
  vsOntem?: number;
  vsOntemPct?: number;
  vs30d?: number;
  vs30dPct?: number;
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

function DeltaCard({
  legenda,
  valor,
  pct,
}: {
  legenda: string;
  valor: number;
  pct: number;
}) {
  const up = valor >= 0;
  return (
    <div className={styles.deltaCard} data-up={up}>
      <span className={styles.deltaLabel}>{legenda}</span>
      <span className={styles.deltaValue}>
        {up ? '↑' : '↓'} {formatBRL(Math.abs(valor))}
      </span>
      <span className={styles.deltaPct}>
        {up ? '+' : '−'}
        {Math.abs(pct).toFixed(1)}%
      </span>
    </div>
  );
}

export function CardSaldoV17({
  saldo = 5000,
  vsOntem = 110,
  vsOntemPct = 2.3,
  vs30d = 650,
  vs30dPct = 15,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: Props) {
  return (
    <Card padding="none">
      <div className={styles.block}>
        <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
        <span className={`${styles.amount} jade-heading-large`}>{formatBRL(saldo)}</span>
        <div className={styles.deltas}>
          <DeltaCard legenda="vs ontem" valor={vsOntem} pct={vsOntemPct} />
          <DeltaCard legenda="vs últimos 30 dias" valor={vs30d} pct={vs30dPct} />
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
