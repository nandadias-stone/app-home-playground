import { type ComponentProps } from 'react';
import { AlertaEquipeV1 } from './v1';

export const AlertaEquipeVersions = {
  v1: AlertaEquipeV1,
} as const;

export type AlertaEquipeVersion = keyof typeof AlertaEquipeVersions;

type Props = ComponentProps<typeof AlertaEquipeV1> & { version?: AlertaEquipeVersion };

export function AlertaEquipe({ version = 'v1', ...props }: Props) {
  const Comp = AlertaEquipeVersions[version] ?? AlertaEquipeV1;
  return <Comp {...props} />;
}
