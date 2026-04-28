import { type ComponentProps } from 'react';
import { CardMetaVendasV1 } from './v1';

export const CardMetaVendasVersions = {
  v1: CardMetaVendasV1,
} as const;

export type CardMetaVendasVersion = keyof typeof CardMetaVendasVersions;

type Props = ComponentProps<typeof CardMetaVendasV1> & { version?: CardMetaVendasVersion };

export function CardMetaVendas({ version = 'v1', ...props }: Props) {
  const Comp = CardMetaVendasVersions[version] ?? CardMetaVendasV1;
  return <Comp {...props} />;
}
