import { useEffect, useState } from 'react';
import { Card, Icon, ShortcutButton } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v7.module.css';

type CardSaldoV7Props = {
  saldo?: number;
  vendasHoje?: number;
  nomeUsuario?: string;
  /** Hora do dia (0-23) para forçar contexto na demo. Sem prop, usa Date.now(). */
  forcarHora?: number;
  onPix?: () => void;
  onTransferir?: () => void;
  onPagar?: () => void;
  onVender?: () => void;
};

type Periodo = 'manha' | 'tarde' | 'noite';

function periodoDoDia(hora: number): Periodo {
  if (hora >= 5 && hora < 12) return 'manha';
  if (hora >= 12 && hora < 18) return 'tarde';
  return 'noite';
}

const BUSINESS_MESSAGES = [
  'Você fez 8 vendas hoje, R$ 293,16 em movimentação.',
  'Seu saldo cresceu 12% nesta semana.',
  'Você tem R$ 87.654,32 a receber nos próximos 30 dias.',
  'Sua taxa de aprovação hoje está em 96%.',
  '3 vendas via Pix nas últimas 2 horas.',
  'Você bateu sua meta de vendas do mês — parabéns!',
  'Movimento médio das últimas sextas: R$ 412,00.',
  'Suas vendas estão 18% acima do mês passado.',
  'Última venda: R$ 87,90 há 12 minutos.',
  'Maquininha mais usada hoje: a do balcão (62% das vendas).',
];

function pickRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

type Phase = 'greeting' | 'loading' | 'ready';

export function CardSaldoV7({
  saldo = 5000,
  vendasHoje = 293.16,
  nomeUsuario = 'Joaquina',
  forcarHora,
  onPix,
  onTransferir,
  onPagar,
  onVender,
}: CardSaldoV7Props) {
  const hora = forcarHora ?? new Date().getHours();
  const periodo = periodoDoDia(hora);
  const saudacao =
    periodo === 'manha'
      ? `Bom dia, ${nomeUsuario}.`
      : periodo === 'tarde'
        ? `Boa tarde, ${nomeUsuario}.`
        : `Boa noite, ${nomeUsuario}.`;

  const [phase, setPhase] = useState<Phase>('greeting');
  const [mensagem] = useState(() => pickRandom(BUSINESS_MESSAGES));

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('loading'), 600);
    const t2 = setTimeout(() => setPhase('ready'), 600 + 900 + Math.random() * 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <Card padding="none">
      <div className={styles.greeting}>
        <p className={`${styles.greetingHello} jade-heading-medium`}>{saudacao}</p>
        {phase === 'ready' ? (
          <p className={`${styles.greetingStatus} jade-heading-small ${styles.fadeIn}`}>
            {mensagem}
          </p>
        ) : phase === 'loading' ? (
          <div className={styles.skeletonWrap} aria-hidden="true">
            <span className={`${styles.skeleton} ${styles.skelLine1}`} />
            <span className={`${styles.skeleton} ${styles.skelLine2}`} />
          </div>
        ) : (
          <div className={styles.skeletonWrap} aria-hidden="true" />
        )}
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
