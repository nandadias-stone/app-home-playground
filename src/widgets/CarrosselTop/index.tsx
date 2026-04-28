import { type ComponentProps } from 'react';
import { CarrosselTopV1 } from './v1';

export const CarrosselTopVersions = {
  v1: CarrosselTopV1,
} as const;

export type CarrosselTopVersion = keyof typeof CarrosselTopVersions;

type Props = ComponentProps<typeof CarrosselTopV1> & { version?: CarrosselTopVersion };

export function CarrosselTop({ version = 'v1', ...props }: Props) {
  const Comp = CarrosselTopVersions[version] ?? CarrosselTopV1;
  return <Comp {...props} />;
}
