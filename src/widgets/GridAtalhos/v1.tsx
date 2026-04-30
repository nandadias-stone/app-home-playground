/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { IconAsset, ICON_MENU_GRID } from '@/jade';
import styles from './v1.module.css';

type Atalho = {
  id: string;
  label: string;
  /** Nome do arquivo em src/assets/icons/menu-grid/ (sem .svg) */
  asset: string;
  badge?: 'Novo' | 'Beta';
};

const DEFAULT_ATALHOS: Atalho[] = [
  { id: 'taxas', label: 'Taxas e Prazos', asset: 'taxas-prazos' },
  { id: 'simulador', label: 'Simulador de vendas', asset: 'simulador' },
  { id: 'link', label: 'Link de Pagamento', asset: 'link' },
  { id: 'boletos', label: 'Criação de Boletos', asset: 'boletos' },
  { id: 'venda', label: 'Venda Digitada', asset: 'venda-digitada' },
  { id: 'cartoes', label: 'Cartões', asset: 'cartoes' },
  { id: 'tap', label: 'TapStone', asset: 'tapstone' },
  { id: 'credito', label: 'Crédito', asset: 'credito' },
  { id: 'funcionarios', label: 'Funcionários', asset: 'funcionarios' },
  { id: 'equipe', label: 'Equipe', asset: 'equipe' },
  { id: 'open', label: 'Open Finance', asset: 'open-finance' },
  { id: 'reserva', label: 'Reserva', asset: 'reservas' },
  { id: 'relatorios', label: 'Relatórios', asset: 'relatorios' },
  { id: 'recarga', label: 'Recarga', asset: 'recarga' },
  { id: 'seguros', label: 'Seguros', asset: 'seguros' },
  { id: 'indique', label: 'Indique e ganhe', asset: 'indique' },
  { id: 'financas', label: 'Finanças', asset: 'financas', badge: 'Novo' },
  { id: 'maquininhas', label: 'Maquininhas', asset: 'maquininha' },
  { id: 'ajuda', label: 'Ajuda', asset: 'ajuda' },
];

type GridAtalhosProps = {
  atalhos?: Atalho[];
};

export function GridAtalhosV1({ atalhos = DEFAULT_ATALHOS }: GridAtalhosProps) {
  return (
    <div className={styles.grid}>
      {atalhos.map((atalho) => {
        const url = ICON_MENU_GRID[atalho.asset];
        return (
          <button key={atalho.id} className={styles.cell} type="button">
            {atalho.badge && <span className={styles.badge}>{atalho.badge}</span>}
            <span className={styles.iconWrap}>
              {url && <IconAsset src={url} size={24} color="var(--jade-content-brand)" />}
            </span>
            <span className={`${styles.label} jade-text-medium-medium`}>{atalho.label}</span>
          </button>
        );
      })}
    </div>
  );
}
