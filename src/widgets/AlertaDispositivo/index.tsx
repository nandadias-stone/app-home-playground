import { type ComponentProps } from 'react';
import { AlertaDispositivoV1 } from './v1';

export const AlertaDispositivoVersions = {
  v1: AlertaDispositivoV1,
} as const;

export type AlertaDispositivoVersion = keyof typeof AlertaDispositivoVersions;

type Props = ComponentProps<typeof AlertaDispositivoV1> & { version?: AlertaDispositivoVersion };

export function AlertaDispositivo({ version = 'v1', ...props }: Props) {
  const Comp = AlertaDispositivoVersions[version] ?? AlertaDispositivoV1;
  return <Comp {...props} />;
}
