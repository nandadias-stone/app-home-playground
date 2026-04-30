/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { Alert, Link } from '@/jade';
import styles from './v1.module.css';

type AlertaItem = {
  id: string;
  variant: 'warning' | 'info';
  title: string;
  description: string;
  actionLabel?: string;
};

const DEFAULT_ALERTAS: AlertaItem[] = [
  {
    id: 'dispositivo',
    variant: 'warning',
    title: 'Cadastre seu dispositivo principal',
    description:
      'Somente o dispositivo principal pode autorizar ou recusar acessos à sua conta. É mais segurança pra você!',
    actionLabel: 'Cadastrar',
  },
  {
    id: 'pix-na-maquininha',
    variant: 'info',
    title: 'Ative o Pix na maquininha',
    description: 'Receba pagamentos por Pix sem taxa direto na sua maquininha Stone.',
    actionLabel: 'Ativar agora',
  },
  {
    id: 'antecipacao',
    variant: 'info',
    title: 'Você tem R$ 87.654 disponíveis pra antecipar',
    description:
      'Antecipe suas vendas a receber e tenha o dinheiro hoje na sua conta.',
    actionLabel: 'Ver oferta',
  },
];

type AlertasProps = {
  alertas?: AlertaItem[];
  onAction?: (id: string) => void;
};

export function AlertasV1({ alertas = DEFAULT_ALERTAS, onAction }: AlertasProps) {
  return (
    <div className={styles.stack}>
      {alertas.map((alerta) => (
        <Alert
          key={alerta.id}
          variant={alerta.variant}
          icon={alerta.variant === 'warning' ? 'warning-triangle' : 'info'}
          title={alerta.title}
          description={alerta.description}
          action={
            alerta.actionLabel ? (
              <Link
                variant="brand"
                trailingIcon="chevron-right"
                onClick={() => onAction?.(alerta.id)}
              >
                {alerta.actionLabel}
              </Link>
            ) : undefined
          }
        />
      ))}
    </div>
  );
}
