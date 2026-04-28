import { type ComponentProps } from 'react';
import { ToggleTonFastV1 } from './v1';

export const ToggleTonFastVersions = {
  v1: ToggleTonFastV1,
} as const;

export type ToggleTonFastVersion = keyof typeof ToggleTonFastVersions;

type Props = ComponentProps<typeof ToggleTonFastV1> & { version?: ToggleTonFastVersion };

export function ToggleTonFast({ version = 'v1', ...props }: Props) {
  const Comp = ToggleTonFastVersions[version] ?? ToggleTonFastV1;
  return <Comp {...props} />;
}
