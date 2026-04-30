import { Card, Icon, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v8.module.css';

type CardSaldoV8Props = {
  saldo?: number;
  reserva?: number;
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

export function CardSaldoV8({
  saldo = 5000,
  reserva = 0,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: CardSaldoV8Props) {
  return (
    <Card padding="none">
      <div className={styles.body}>
        <button className={styles.block} type="button">
          <span className={styles.column}>
            <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
            <span className={`${styles.amount} jade-heading-large`}>{formatBRL(saldo)}</span>
          </span>
          <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
        </button>

        <button className={styles.block} type="button">
          <span className={styles.column}>
            <span className={`${styles.label} jade-text-medium-regular`}>Reserva Stone</span>
            <span className={`${styles.amountSmall} jade-heading-small`}>{formatBRL(reserva)}</span>
          </span>
          <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
        </button>
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
