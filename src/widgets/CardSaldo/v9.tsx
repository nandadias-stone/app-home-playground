import { Card, Icon, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v9.module.css';

type CardSaldoV9Props = {
  saldo?: number;
  aReceber?: number;
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

export function CardSaldoV9({
  saldo = 5000,
  aReceber = 87654.32,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: CardSaldoV9Props) {
  return (
    <Card padding="none">
      <div className={styles.metrics}>
        <button className={styles.row} type="button">
          <span className={styles.column}>
            <span className={`${styles.label} jade-text-medium-regular`}>Saldo na conta</span>
            <span className={`${styles.amount} jade-heading-medium`}>{formatBRL(saldo)}</span>
          </span>
          <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
        </button>

        <button className={styles.row} type="button">
          <span className={styles.column}>
            <span className={`${styles.labelWithDetail} jade-text-medium-regular`}>
              A receber
              <span className={`${styles.detail} jade-text-small-regular`}>
                · próx. 30 dias
              </span>
            </span>
            <span className={`${styles.amountFuture} jade-heading-medium`}>
              {formatBRL(aReceber)}
            </span>
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
