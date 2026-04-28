import { type ComponentProps } from 'react';
import { GridAtalhosV1 } from './v1';

export const GridAtalhosVersions = {
  v1: GridAtalhosV1,
} as const;

export type GridAtalhosVersion = keyof typeof GridAtalhosVersions;

type Props = ComponentProps<typeof GridAtalhosV1> & { version?: GridAtalhosVersion };

export function GridAtalhos({ version = 'v1', ...props }: Props) {
  const Comp = GridAtalhosVersions[version] ?? GridAtalhosV1;
  return <Comp {...props} />;
}
