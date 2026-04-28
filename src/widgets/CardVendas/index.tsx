import { type ComponentProps } from 'react';
import { CardVendasV1 } from './v1';

export const CardVendasVersions = {
  v1: CardVendasV1,
} as const;

export type CardVendasVersion = keyof typeof CardVendasVersions;

type Props = ComponentProps<typeof CardVendasV1> & { version?: CardVendasVersion };

export function CardVendas({ version = 'v1', ...props }: Props) {
  const Comp = CardVendasVersions[version] ?? CardVendasV1;
  return <Comp {...props} />;
}
