import { type ComponentProps } from 'react';
import { BannerCapitalGiroV1 } from './v1';

export const BannerCapitalGiroVersions = {
  v1: BannerCapitalGiroV1,
} as const;

export type BannerCapitalGiroVersion = keyof typeof BannerCapitalGiroVersions;

type Props = ComponentProps<typeof BannerCapitalGiroV1> & { version?: BannerCapitalGiroVersion };

export function BannerCapitalGiro({ version = 'v1', ...props }: Props) {
  const Comp = BannerCapitalGiroVersions[version] ?? BannerCapitalGiroV1;
  return <Comp {...props} />;
}
