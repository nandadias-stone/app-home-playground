import { Card, Icon, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v5.module.css';

type CardSaldoV5Props = {
  saldo?: number;
  agendados?: number;
  bloqueados?: number;
  reserva?: number;
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

export function CardSaldoV5({
  saldo = 5000,
  agendados = 0,
  bloqueados = 0,
  reserva = 0,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: CardSaldoV5Props) {
  const chips = [
    { label: 'Agendado', value: agendados },
    { label: 'Bloqueado', value: bloqueados },
    { label: 'Reserva', value: reserva },
  ];

  return (
    <Card padding="none">
      <div className={styles.body}>
        <button className={styles.heroBlock} type="button">
          <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
          <span className={styles.amountRow}>
            <span className={`${styles.amount} jade-heading-large`}>{formatBRL(saldo)}</span>
            <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
          </span>
        </button>

        <div className={styles.chips}>
          {chips.map((chip) => (
            <span key={chip.label} className={styles.chip}>
              <span className={`${styles.chipLabel} jade-text-small-medium`}>{chip.label}</span>
              <span className={`${styles.chipValue} jade-text-small-semibold`}>
                {formatBRL(chip.value)}
              </span>
            </span>
          ))}
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
