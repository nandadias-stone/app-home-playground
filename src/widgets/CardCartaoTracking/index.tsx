import { type ComponentProps } from 'react';
import { CardCartaoTrackingV1 } from './v1';

export const CardCartaoTrackingVersions = {
  v1: CardCartaoTrackingV1,
} as const;

export type CardCartaoTrackingVersion = keyof typeof CardCartaoTrackingVersions;

type Props = ComponentProps<typeof CardCartaoTrackingV1> & { version?: CardCartaoTrackingVersion };

export function CardCartaoTracking({ version = 'v1', ...props }: Props) {
  const Comp = CardCartaoTrackingVersions[version] ?? CardCartaoTrackingV1;
  return <Comp {...props} />;
}
