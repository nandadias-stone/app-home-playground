import { type ComponentProps } from 'react';
import { CardCopilotoV1 } from './v1';

export const CardCopilotoVersions = {
  v1: CardCopilotoV1,
} as const;

export type CardCopilotoVersion = keyof typeof CardCopilotoVersions;

type Props = ComponentProps<typeof CardCopilotoV1> & { version?: CardCopilotoVersion };

export function CardCopiloto({ version = 'v1', ...props }: Props) {
  const Comp = CardCopilotoVersions[version] ?? CardCopilotoV1;
  return <Comp {...props} />;
}
