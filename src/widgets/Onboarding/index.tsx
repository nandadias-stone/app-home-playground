import { type ComponentProps } from 'react';
import { OnboardingV1 } from './v1';

export const OnboardingVersions = {
  v1: OnboardingV1,
} as const;

export type OnboardingVersion = keyof typeof OnboardingVersions;

type Props = ComponentProps<typeof OnboardingV1> & { version?: OnboardingVersion };

export function Onboarding({ version = 'v1', ...props }: Props) {
  const Comp = OnboardingVersions[version] ?? OnboardingV1;
  return <Comp {...props} />;
}
