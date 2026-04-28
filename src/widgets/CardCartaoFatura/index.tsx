import { type ComponentProps } from 'react';
import { CardCartaoFaturaV1 } from './v1';

export const CardCartaoFaturaVersions = {
  v1: CardCartaoFaturaV1,
} as const;

export type CardCartaoFaturaVersion = keyof typeof CardCartaoFaturaVersions;

type Props = ComponentProps<typeof CardCartaoFaturaV1> & { version?: CardCartaoFaturaVersion };

export function CardCartaoFatura({ version = 'v1', ...props }: Props) {
  const Comp = CardCartaoFaturaVersions[version] ?? CardCartaoFaturaV1;
  return <Comp {...props} />;
}
