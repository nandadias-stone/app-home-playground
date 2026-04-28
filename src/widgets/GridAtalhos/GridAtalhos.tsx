import { Card, Icon, type IconName } from '@/jade';
import styles from './GridAtalhos.module.css';

type Atalho = {
  id: string;
  label: string;
  icon: IconName;
  badge?: 'Novo' | 'Beta';
};

const DEFAULT_ATALHOS: Atalho[] = [
  { id: 'taxas', label: 'Taxas e Prazos', icon: 'currency-circle' },
  { id: 'simulador', label: 'Simulador de vendas', icon: 'percent-circle' },
  { id: 'link', label: 'Link de Pagamento', icon: 'send' },
  { id: 'boletos', label: 'Criação de Boletos', icon: 'barcode' },
  { id: 'venda', label: 'Venda Digitada', icon: 'note-pencil' },
  { id: 'cartoes', label: 'Cartões', icon: 'credit-card' },
  { id: 'tap', label: 'TapStone', icon: 'tap-stone' },
  { id: 'credito', label: 'Crédito', icon: 'currency-dollar' },
  { id: 'funcionarios', label: 'Funcionários', icon: 'users' },
  { id: 'equipe', label: 'Equipe', icon: 'users' },
  { id: 'open', label: 'Open Finance', icon: 'open-finance' },
  { id: 'reserva', label: 'Reserva', icon: 'piggy-bank-fill' },
  { id: 'relatorios', label: 'Relatórios', icon: 'note-text' },
  { id: 'recarga', label: 'Recarga', icon: 'device-mobile' },
  { id: 'seguros', label: 'Seguros', icon: 'shield-check' },
  { id: 'indique', label: 'Indique e ganhe', icon: 'gift' },
  { id: 'financas', label: 'Finanças', icon: 'chart-pie', badge: 'Novo' },
  { id: 'maquininhas', label: 'Maquininhas', icon: 'storefront' },
  { id: 'ajuda', label: 'Ajuda', icon: 'help-circle' },
];

type GridAtalhosProps = {
  atalhos?: Atalho[];
};

export function GridAtalhos({ atalhos = DEFAULT_ATALHOS }: GridAtalhosProps) {
  return (
    <div className={styles.grid}>
      {atalhos.map((atalho) => (
        <button key={atalho.id} className={styles.cell} type="button">
          {atalho.badge && <span className={styles.badge}>{atalho.badge}</span>}
          <span className={styles.iconWrap}>
            <Icon name={atalho.icon} size={24} color="var(--jade-content-brand)" />
          </span>
          <span className={`${styles.label} jade-text-medium-medium`}>{atalho.label}</span>
        </button>
      ))}
    </div>
  );
}
