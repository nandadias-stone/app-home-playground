import { Alert, Link } from '@/jade';

type AlertaDispositivoProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function AlertaDispositivoV1({
  title = 'Cadastre seu dispositivo principal',
  description = 'Somente o dispositivo principal pode autorizar ou recusar acessos à sua conta. É mais segurança pra você!',
  actionLabel = 'Cadastrar',
  onAction,
}: AlertaDispositivoProps) {
  return (
    <Alert
      variant="warning"
      icon="warning-triangle"
      title={title}
      description={description}
      action={
        <Link variant="brand" trailingIcon="chevron-right" onClick={onAction}>
          {actionLabel}
        </Link>
      }
    />
  );
}
