import { type ComponentProps } from 'react';
import { CardSaldoV1 } from './v1';

export const CardSaldoVersions = {
  v1: CardSaldoV1,
} as const;

export type CardSaldoVersion = keyof typeof CardSaldoVersions;

type Props = ComponentProps<typeof CardSaldoV1> & { version?: CardSaldoVersion };

export function CardSaldo({ version = 'v1', ...props }: Props) {
  const Comp = CardSaldoVersions[version] ?? CardSaldoV1;
  return <Comp {...props} />;
}
