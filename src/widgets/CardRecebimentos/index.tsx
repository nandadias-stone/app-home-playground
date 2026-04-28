import { type ComponentProps } from 'react';
import { CardRecebimentosV1 } from './v1';

export const CardRecebimentosVersions = {
  v1: CardRecebimentosV1,
} as const;

export type CardRecebimentosVersion = keyof typeof CardRecebimentosVersions;

type Props = ComponentProps<typeof CardRecebimentosV1> & { version?: CardRecebimentosVersion };

export function CardRecebimentos({ version = 'v1', ...props }: Props) {
  const Comp = CardRecebimentosVersions[version] ?? CardRecebimentosV1;
  return <Comp {...props} />;
}
