import { type ComponentProps } from 'react';
import { CardMeuAgenteV1 } from './v1';

export const CardMeuAgenteVersions = {
  v1: CardMeuAgenteV1,
} as const;

export type CardMeuAgenteVersion = keyof typeof CardMeuAgenteVersions;

type Props = ComponentProps<typeof CardMeuAgenteV1> & { version?: CardMeuAgenteVersion };

export function CardMeuAgente({ version = 'v1', ...props }: Props) {
  const Comp = CardMeuAgenteVersions[version] ?? CardMeuAgenteV1;
  return <Comp {...props} />;
}
