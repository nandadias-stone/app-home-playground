import { type ComponentProps } from 'react';
import { BannerAutocredenciamentoV1 } from './v1';

export const BannerAutocredenciamentoVersions = {
  v1: BannerAutocredenciamentoV1,
} as const;

export type BannerAutocredenciamentoVersion = keyof typeof BannerAutocredenciamentoVersions;

type Props = ComponentProps<typeof BannerAutocredenciamentoV1> & { version?: BannerAutocredenciamentoVersion };

export function BannerAutocredenciamento({ version = 'v1', ...props }: Props) {
  const Comp = BannerAutocredenciamentoVersions[version] ?? BannerAutocredenciamentoV1;
  return <Comp {...props} />;
}
