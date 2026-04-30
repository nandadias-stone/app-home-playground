/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { Alert } from '@/jade';

type AlertaEquipeProps = {
  title?: string;
  description?: string;
};

export function AlertaEquipeV1({
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
