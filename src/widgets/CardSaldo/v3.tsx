import { Card, Icon, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v3.module.css';

type CardSaldoV3Props = {
  saldo?: number;
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

export function CardSaldoV3({
  saldo = 5000,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: CardSaldoV3Props) {
  return (
    <Card padding="none">
      <button className={styles.row} type="button">
        <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
        <span className={styles.amountWrap}>
          <span className={`${styles.amount} jade-text-large-semibold`}>
            {formatBRL(saldo)}
          </span>
          <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
        </span>
      </button>

      <div className={styles.shortcuts}>
        <ShortcutButton icon="pix" label="Pix" onClick={onPix} />
        <ShortcutButton icon="arrows-left-right" label="Transferir" onClick={onTransferir} />
        <ShortcutButton icon="qr-code" label="Pagar" onClick={onPagar} />
        <ShortcutButton icon="currency-dollar" label="Vender" onClick={onVender} />
      </div>
    </Card>
  );
}
