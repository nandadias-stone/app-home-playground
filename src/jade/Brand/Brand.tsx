import { ICON_GENERAL } from '../Icon/icon-assets';

type BrandVariant = 'mastercard' | 'visa' | 'pix' | 'pix-small' | 'boleto' | 'elo';

type BrandProps = {
  variant: BrandVariant;
  size?: number;
};

/** Mapa de variant -> nome do arquivo em src/assets/icons/ (sem .svg). */
const ASSET_BY_VARIANT: Record<BrandVariant, string> = {
  mastercard: 'mastercard',
  visa: 'mastercard',
  pix: 'pix',
  'pix-small': 'pix-small',
  boleto: 'boleto',
  elo: 'mastercard',
};

export function Brand({ variant, size = 24 }: BrandProps) {
  const assetKey = ASSET_BY_VARIANT[variant];
  const url = ICON_GENERAL[assetKey];
  if (!url) return null;
  return (
    <img
      src={url}
      width={size}
      height={size}
      alt={variant}
      style={{ display: 'inline-block', flexShrink: 0 }}
    />
  );
}
