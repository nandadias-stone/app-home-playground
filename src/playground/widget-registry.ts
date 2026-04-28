import { type ComponentType } from 'react';
import { Onboarding, OnboardingVersions } from '@/widgets/Onboarding';
import { AlertaEquipe, AlertaEquipeVersions } from '@/widgets/AlertaEquipe';
import { AlertaDispositivo, AlertaDispositivoVersions } from '@/widgets/AlertaDispositivo';
import { CardCopiloto, CardCopilotoVersions } from '@/widgets/CardCopiloto';
import { CardSaldo, CardSaldoVersions } from '@/widgets/CardSaldo';
import { CarrosselTop, CarrosselTopVersions } from '@/widgets/CarrosselTop';
import { BannerCapitalGiro, BannerCapitalGiroVersions } from '@/widgets/BannerCapitalGiro';
import {
  BannerAutocredenciamento,
  BannerAutocredenciamentoVersions,
} from '@/widgets/BannerAutocredenciamento';
import { CardRecebimentos, CardRecebimentosVersions } from '@/widgets/CardRecebimentos';
import { ToggleTonFast, ToggleTonFastVersions } from '@/widgets/ToggleTonFast';
import { CardVendas, CardVendasVersions } from '@/widgets/CardVendas';
import { CardCartaoTracking, CardCartaoTrackingVersions } from '@/widgets/CardCartaoTracking';
import { CardCartaoFatura, CardCartaoFaturaVersions } from '@/widgets/CardCartaoFatura';
import { CardMetaVendas, CardMetaVendasVersions } from '@/widgets/CardMetaVendas';
import { CardMaquininhas, CardMaquininhasVersions } from '@/widgets/CardMaquininhas';
import { GridAtalhos, GridAtalhosVersions } from '@/widgets/GridAtalhos';
import { BannersBottom, BannersBottomVersions } from '@/widgets/BannersBottom';
import { CardMeuAgente, CardMeuAgenteVersions } from '@/widgets/CardMeuAgente';

export type WidgetId =
  | 'onboarding'
  | 'alerta-equipe'
  | 'alerta-dispositivo'
  | 'card-copiloto'
  | 'card-saldo'
  | 'carrossel-top'
  | 'banner-capital-giro'
  | 'banner-autocredenciamento'
  | 'card-recebimentos'
  | 'toggle-ton-fast'
  | 'card-vendas'
  | 'card-cartao-tracking'
  | 'card-cartao-fatura'
  | 'card-meta-vendas'
  | 'card-maquininhas'
  | 'grid-atalhos'
  | 'banners-bottom'
  | 'card-meu-agente';

export type WidgetEntry = {
  id: WidgetId;
  label: string;
  component: ComponentType<{ version?: string }>;
  versions: readonly string[];
};

export const WIDGET_REGISTRY: Record<WidgetId, WidgetEntry> = {
  'onboarding': {
    id: 'onboarding',
    label: 'Onboarding',
    component: Onboarding as ComponentType<{ version?: string }>,
    versions: Object.keys(OnboardingVersions),
  },
  'alerta-equipe': {
    id: 'alerta-equipe',
    label: 'Alerta Equipe',
    component: AlertaEquipe as ComponentType<{ version?: string }>,
    versions: Object.keys(AlertaEquipeVersions),
  },
  'alerta-dispositivo': {
    id: 'alerta-dispositivo',
    label: 'Alerta Dispositivo',
    component: AlertaDispositivo as ComponentType<{ version?: string }>,
    versions: Object.keys(AlertaDispositivoVersions),
  },
  'card-copiloto': {
    id: 'card-copiloto',
    label: 'Card Copiloto',
    component: CardCopiloto as ComponentType<{ version?: string }>,
    versions: Object.keys(CardCopilotoVersions),
  },
  'card-saldo': {
    id: 'card-saldo',
    label: 'Card Saldo',
    component: CardSaldo as ComponentType<{ version?: string }>,
    versions: Object.keys(CardSaldoVersions),
  },
  'carrossel-top': {
    id: 'carrossel-top',
    label: 'Carrossel Top',
    component: CarrosselTop as ComponentType<{ version?: string }>,
    versions: Object.keys(CarrosselTopVersions),
  },
  'banner-capital-giro': {
    id: 'banner-capital-giro',
    label: 'Banner Capital de Giro',
    component: BannerCapitalGiro as ComponentType<{ version?: string }>,
    versions: Object.keys(BannerCapitalGiroVersions),
  },
  'banner-autocredenciamento': {
    id: 'banner-autocredenciamento',
    label: 'Banner Autocredenciamento',
    component: BannerAutocredenciamento as ComponentType<{ version?: string }>,
    versions: Object.keys(BannerAutocredenciamentoVersions),
  },
  'card-recebimentos': {
    id: 'card-recebimentos',
    label: 'Card Recebimentos',
    component: CardRecebimentos as ComponentType<{ version?: string }>,
    versions: Object.keys(CardRecebimentosVersions),
  },
  'toggle-ton-fast': {
    id: 'toggle-ton-fast',
    label: 'Toggle Ton Fast',
    component: ToggleTonFast as ComponentType<{ version?: string }>,
    versions: Object.keys(ToggleTonFastVersions),
  },
  'card-vendas': {
    id: 'card-vendas',
    label: 'Card Vendas',
    component: CardVendas as ComponentType<{ version?: string }>,
    versions: Object.keys(CardVendasVersions),
  },
  'card-cartao-tracking': {
    id: 'card-cartao-tracking',
    label: 'Card Cartão · Tracking',
    component: CardCartaoTracking as ComponentType<{ version?: string }>,
    versions: Object.keys(CardCartaoTrackingVersions),
  },
  'card-cartao-fatura': {
    id: 'card-cartao-fatura',
    label: 'Card Cartão · Fatura',
    component: CardCartaoFatura as ComponentType<{ version?: string }>,
    versions: Object.keys(CardCartaoFaturaVersions),
  },
  'card-meta-vendas': {
    id: 'card-meta-vendas',
    label: 'Card Meta de Vendas',
    component: CardMetaVendas as ComponentType<{ version?: string }>,
    versions: Object.keys(CardMetaVendasVersions),
  },
  'card-maquininhas': {
    id: 'card-maquininhas',
    label: 'Card Maquininhas',
    component: CardMaquininhas as ComponentType<{ version?: string }>,
    versions: Object.keys(CardMaquininhasVersions),
  },
  'grid-atalhos': {
    id: 'grid-atalhos',
    label: 'Grid de Atalhos',
    component: GridAtalhos as ComponentType<{ version?: string }>,
    versions: Object.keys(GridAtalhosVersions),
  },
  'banners-bottom': {
    id: 'banners-bottom',
    label: 'Banners Bottom',
    component: BannersBottom as ComponentType<{ version?: string }>,
    versions: Object.keys(BannersBottomVersions),
  },
  'card-meu-agente': {
    id: 'card-meu-agente',
    label: 'Card Meu Agente',
    component: CardMeuAgente as ComponentType<{ version?: string }>,
    versions: Object.keys(CardMeuAgenteVersions),
  },
};

export const DEFAULT_ORDER: WidgetId[] = [
  'onboarding',
  'alerta-equipe',
  'alerta-dispositivo',
  'card-copiloto',
  'card-saldo',
  'carrossel-top',
  'banner-capital-giro',
  'banner-autocredenciamento',
  'card-recebimentos',
  'toggle-ton-fast',
  'card-vendas',
  'card-cartao-tracking',
  'card-cartao-fatura',
  'card-meta-vendas',
  'card-maquininhas',
  'grid-atalhos',
  'banners-bottom',
  'card-meu-agente',
];
