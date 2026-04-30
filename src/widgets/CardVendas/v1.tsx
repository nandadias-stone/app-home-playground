/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { Brand, Card, Divider, Icon, IconButton, Tag } from '@/jade';
import { formatBRL } from '@/utils/format';
import styles from './v1.module.css';

type Venda = {
  id: string;
  tipo: 'cartao' | 'boleto' | 'pix';
  brand: 'mastercard' | 'visa' | 'pix' | 'boleto' | 'elo';
  parcelas?: string;
  hora: string;
  detalhe: string;
  valor?: number;
  status: 'aprovada' | 'pendente';
};

const DEFAULT_VENDAS: Venda[] = [
  {
    id: '1',
    tipo: 'cartao',
    brand: 'mastercard',
    parcelas: 'Crédito 6x',
    hora: '12:40',
    detalhe: 'Maquininha',
    status: 'aprovada',
  },
  {
    id: '2',
    tipo: 'boleto',
    brand: 'boleto',
    parcelas: 'Boleto',
    hora: '12:40',
    detalhe: 'Samyra Matt',
    valor: 100,
    status: 'aprovada',
  },
  {
    id: '3',
    tipo: 'pix',
    brand: 'pix',
    parcelas: 'Pix',
    hora: '12:40',
    detalhe: 'Lorrany Andrade',
    status: 'aprovada',
  },
];

type CardVendasProps = {
  vendas7Dias?: number;
  ticketMedio?: string;
  vendas?: Venda[];
  ultimaAtualizacao?: string;
  onConferirMais?: () => void;
};

export function CardVendasV1({
  vendas7Dias = 76543.21,
  ticketMedio = '••••',
  vendas = DEFAULT_VENDAS,
  ultimaAtualizacao = '12:41',
  onConferirMais,
}: CardVendasProps) {
  return (
    <Card padding="none">
      <button className={styles.headerBlock} type="button">
        <div className={styles.column}>
          <span className={`${styles.label} jade-text-medium-regular`}>
            Vendas dos últimos 7 dias
          </span>
          <span className={`${styles.amount} jade-heading-medium`}>
            {formatBRL(vendas7Dias)}
          </span>
          <span className={`${styles.ticket} jade-text-small-regular`}>
            Ticket médio: {ticketMedio}
          </span>
        </div>
        <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
      </button>

      <Divider />

      <div className={styles.ultimas}>
        <div className={styles.ultimasHead}>
          <div className={styles.column}>
            <span className={`${styles.subTitle} jade-text-medium-semibold`}>Últimas vendas</span>
            <span className={`${styles.label} jade-text-small-regular`}>
              Atualizado às {ultimaAtualizacao}
            </span>
          </div>
          <IconButton icon="refresh" variant="subtle" size="medium" ariaLabel="Atualizar vendas" />
        </div>

        <ul className={styles.lista}>
          {vendas.map((venda, idx) => (
            <li key={venda.id} className={styles.item}>
              <Brand variant={venda.brand} size={32} />
              <div className={styles.itemBody}>
                <span className={`${styles.itemTitle} jade-text-medium-medium`}>
                  {venda.parcelas}
                </span>
                <span className={`${styles.itemMeta} jade-text-small-regular`}>
                  {venda.hora} • {venda.detalhe}
                </span>
              </div>
              <div className={styles.itemTrailing}>
                {venda.valor != null && (
                  <span className={`${styles.itemValor} jade-text-medium-medium`}>
                    {formatBRL(venda.valor)}
                  </span>
                )}
                {venda.valor == null && (
                  <span className={styles.dots}>••••</span>
                )}
                {venda.status === 'aprovada' && <Tag variant="positive">Aprovada</Tag>}
              </div>
              {idx < vendas.length - 1 && <hr className={styles.itemDivider} />}
            </li>
          ))}
        </ul>
      </div>

      <Divider />

      <button className={styles.conferirBlock} type="button" onClick={onConferirMais}>
        <span className={`${styles.conferirLabel} jade-text-medium-medium`}>
          Conferir mais vendas
        </span>
        <Icon name="chevron-right" size={20} color="var(--jade-content-low)" />
      </button>
    </Card>
  );
}
