import { Card, Icon, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v7.module.css';

type CardSaldoV7Props = {
  saldo?: number;
  vendasHoje?: number;
  nomeUsuario?: string;
  statusMensagem?: string;
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

export function CardSaldoV7({
  saldo = 5000,
  vendasHoje = 293.16,
  nomeUsuario = 'Cíntia',
  statusMensagem = 'Tudo em ordem por aqui.',
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: CardSaldoV7Props) {
  return (
    <Card padding="none">
      <div className={styles.greeting}>
        <p className={`${styles.greetingHello} jade-heading-medium`}>Olá, {nomeUsuario}.</p>
        <p className={`${styles.greetingStatus} jade-heading-medium`}>{statusMensagem}</p>
      </div>

      <div className={styles.metrics}>
        <button className={styles.row} type="button">
          <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
          <span className={styles.amountWrap}>
            <span className={`${styles.amount} jade-text-large-semibold`}>
              {formatBRL(saldo)}
            </span>
            <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
          </span>
        </button>

        <button className={styles.row} type="button">
          <span className={styles.labelWithCaret}>
            <span className={`${styles.label} jade-text-medium-regular`}>Vendas de hoje</span>
            <Icon name="caret-down" size={16} color="var(--jade-content-medium)" />
          </span>
          <span className={styles.amountWrap}>
            <span className={`${styles.amount} jade-text-large-semibold`}>
              {formatBRL(vendasHoje)}
            </span>
            <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
          </span>
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
