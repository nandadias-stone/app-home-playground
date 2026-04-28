import { type SVGProps } from 'react';
import { ICON_PATHS, type IconName } from './icon-paths';

type IconProps = {
  name: IconName;
  size?: number | string;
  color?: string;
} & Omit<SVGProps<SVGSVGElement>, 'name' | 'color'>;

export function Icon({ name, size = 24, color = 'currentColor', ...rest }: IconProps) {
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
