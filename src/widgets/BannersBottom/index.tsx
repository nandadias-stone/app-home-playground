import { type ComponentProps } from 'react';
import { BannersBottomV1 } from './v1';

export const BannersBottomVersions = {
  v1: BannersBottomV1,
} as const;

export type BannersBottomVersion = keyof typeof BannersBottomVersions;

type Props = ComponentProps<typeof BannersBottomV1> & { version?: BannersBottomVersion };

export function BannersBottom({ version = 'v1', ...props }: Props) {
  const Comp = BannersBottomVersions[version] ?? BannersBottomV1;
  return <Comp {...props} />;
}
