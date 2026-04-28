import { Card, Divider, Icon, Link, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v1.module.css';

type CardSaldoProps = {
  saldo?: number;
  agendados?: number;
  bloqueados?: number;
  reserva?: number;
  limiteAtivo?: boolean;
  limiteRetiravel?: number;
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

export function CardSaldoV1({
  saldo = 5000,
  agendados = 0,
  bloqueados = 0,
  reserva = 0,
  limiteAtivo = true,
  limiteRetiravel = 5000,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: CardSaldoProps) {
  return (
    <Card padding="none">
      <div className={styles.body}>
        <button className={styles.saldoBlock} type="button">
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
              <span className={`${styles.amount} jade-heading-large`}>{formatBRL(saldo)}</span>
              <span className={styles.metaRow}>
                <Icon name="calendar" size={16} color="var(--jade-content-medium)" />
                <span className={`${styles.meta} jade-text-medium-regular`}>
                  {formatBRL(agendados, true)} agendados
                </span>
              </span>
              <span className={styles.metaRow}>
                <Icon name="lock" size={16} color="var(--jade-content-medium)" />
                <span className={`${styles.meta} jade-text-medium-regular`}>
                  {formatBRL(bloqueados, true)} bloqueados
                </span>
              </span>
            </div>
            <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
          </div>
        </button>

        <Divider />

        <button className={styles.reservaBlock} type="button">
          <div className={styles.column}>
            <span className={`${styles.label} jade-text-medium-regular`}>Reserva Stone</span>
            <span className={`${styles.amountSmall} jade-heading-small`}>{formatBRL(reserva)}</span>
          </div>
          <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
        </button>

        {limiteAtivo && (
          <>
            <Divider />
            <div className={styles.limiteBlock}>
              <div className={styles.column}>
                <span className={`${styles.limiteTitle} jade-text-medium-medium`}>
                  O Limite da Conta está ativo
                </span>
                <span className={`${styles.meta} jade-text-small-regular`}>
                  Retire até {formatBRL(limiteRetiravel)}
                </span>
              </div>
              <Link variant="brand" trailingIcon={null}>Conferir</Link>
            </div>
          </>
        )}
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
