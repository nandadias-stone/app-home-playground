import { type SVGProps } from 'react';
import { ICON_PATHS, type IconName } from './icon-paths';
import { IconAsset } from './IconAsset';
import { ICON_GENERAL } from './icon-assets';

type IconProps = {
  name: IconName;
  size?: number | string;
  color?: string;
} & Omit<SVGProps<SVGSVGElement>, 'name' | 'color'>;

/**
 * Mapa name (legado) -> nome do arquivo SVG em src/assets/icons/.
 * Permite que widgets continuem usando os mesmos nomes do Phosphor mesmo após
 * a migração para os SVGs reais do Figma. Quando o nome existe no mapa e o
 * asset está disponível, o ícone é renderizado pelo IconAsset (recolorível).
 */
const ASSET_ALIASES: Partial<Record<IconName, string>> = {
  'caret-down': 'chevron-down',
  'chevron-down': 'chevron-down',
  user: 'user',
  lock: 'lock',
  'lock-fill': 'lock',
  pix: 'pix',
  'arrows-left-right': 'transferir',
  'currency-dollar': 'vender',
  'currency-circle': 'meta-de-vendas',
  'warning-circle': 'warning',
  'warning-triangle': 'warning-color',
  sparkle: 'ai',
  storefront: 'store',
  'storefront-shop': 'store',
  'device-mobile': 'phone',
  calendar: 'antecipacao',
  'chart-pie': 'chart',
  'qr-code': 'guardar',
};

export function Icon({ name, size = 24, color = 'currentColor', ...rest }: IconProps) {
  const assetKey = ASSET_ALIASES[name];
  if (assetKey && ICON_GENERAL[assetKey]) {
    return <IconAsset src={ICON_GENERAL[assetKey]} size={size} color={color} />;
  }

  const path = ICON_PATHS[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill={color}
      aria-hidden="true"
      {...rest}
    >
      {path}
    </svg>
  );
}

export type { IconName } from './icon-paths';
