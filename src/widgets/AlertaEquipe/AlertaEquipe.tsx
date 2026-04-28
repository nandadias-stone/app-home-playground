import { Alert } from '@/jade';

type AlertaEquipeProps = {
  title?: string;
  description?: string;
};

export function AlertaEquipe({
  title = 'Equipe',
  description = 'Você faz parte da Equipe desta conta, algumas funcionalidades podem não estar disponíveis.',
}: AlertaEquipeProps) {
  return (
    <Alert
      variant="neutral"
      icon="warning-circle"
      title={title}
      description={description}
    />
  );
}
