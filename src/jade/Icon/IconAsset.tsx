import { type CSSProperties } from 'react';

type IconAssetProps = {
  src: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Renderiza um SVG arbitrário como ícone monocromático recolorível via `mask-image`.
 * A cor vem de `color` (default: currentColor) — herda a cor do contexto naturalmente.
 */
export function IconAsset({ src, size = 24, color = 'currentColor', className, style }: IconAssetProps) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
