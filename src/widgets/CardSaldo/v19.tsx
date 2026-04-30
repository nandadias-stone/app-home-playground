import type { CSSProperties } from 'react';
import { Card, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v19.module.css';

type Props = {
  saldo?: number;
  /** Série de movimentação dos últimos 30 dias (default: gerada com seed fixa). */
  dias?: number[];
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

// Série fixa pra demo — variação realista de movimento diário
const DEFAULT_DIAS = [
  120, 340, 80, 0, 280, 410, 190, 220, 50, 180, 360, 240, 90, 310, 470, 200,
  60, 0, 150, 290, 380, 110, 240, 350, 190, 70, 280, 420, 310, 293,
];

export function CardSaldoV19({
  saldo = 5000,
  dias = DEFAULT_DIAS,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: Props) {
  const max = Math.max(...dias, 1);
  return (
    <Card padding="none">
      <div className={styles.block}>
        <span className={`${styles.label} jade-text-medium-regular`}>Saldo da conta</span>
        <span className={`${styles.amount} jade-heading-large`}>{formatBRL(saldo)}</span>
        <span className={styles.subtitle}>Movimento dos últimos 30 dias</span>
        <div
          className={styles.grid}
          role="img"
          aria-label="Mapa de calor da movimentação dos últimos 30 dias"
        >
          {dias.map((v, i) => {
            const intensity = v / max;
            return (
              <span
                key={i}
                className={styles.dot}
                style={{ '--i': intensity.toFixed(3) } as CSSProperties}
                title={formatBRL(v)}
              />
            );
          })}
        </div>
        <div className={styles.legend}>
          <span className={styles.legendLabel}>Menos</span>
          <span className={styles.legendDot} style={{ '--i': '0.05' } as CSSProperties} />
          <span className={styles.legendDot} style={{ '--i': '0.3' } as CSSProperties} />
          <span className={styles.legendDot} style={{ '--i': '0.6' } as CSSProperties} />
          <span className={styles.legendDot} style={{ '--i': '1' } as CSSProperties} />
          <span className={styles.legendLabel}>Mais</span>
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
