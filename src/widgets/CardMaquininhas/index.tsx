import { type ComponentProps } from 'react';
import { CardMaquininhasV1 } from './v1';

export const CardMaquininhasVersions = {
  v1: CardMaquininhasV1,
} as const;

export type CardMaquininhasVersion = keyof typeof CardMaquininhasVersions;

type Props = ComponentProps<typeof CardMaquininhasV1> & { version?: CardMaquininhasVersion };

export function CardMaquininhas({ version = 'v1', ...props }: Props) {
  const Comp = CardMaquininhasVersions[version] ?? CardMaquininhasV1;
  return <Comp {...props} />;
}
