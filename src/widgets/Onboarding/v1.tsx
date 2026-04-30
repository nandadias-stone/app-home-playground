/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { Card, Icon, type IconName, Tag } from '@/jade';
import styles from './v1.module.css';

type OnboardingTask = {
  id: string;
  label: string;
  done?: boolean;
  badge?: { label: string; variant: 'warning' | 'positive' | 'neutral' };
};

type OnboardingGroup = {
  id: string;
  title: string;
  icon: IconName;
  total: number;
  done: number;
  tasks: OnboardingTask[];
};

const DEFAULT_GROUPS: OnboardingGroup[] = [
  {
    id: 'acao',
    title: 'Ação necessária',
    icon: 'warning-triangle',
    total: 1,
    done: 0,
    tasks: [
      {
        id: 'contratacao',
        label: 'Confira os detalhes da sua contratação',
        badge: { label: 'Importante', variant: 'warning' },
      },
    ],
  },
  {
    id: 'conta',
    title: 'Potencialize sua conta',
    icon: 'device-mobile',
    total: 3,
    done: 0,
    tasks: [
      { id: 'vendas', label: 'Traga suas vendas pra sua conta' },
      { id: 'pix', label: 'Crie sua chave Pix' },
      { id: 'cartao', label: 'Peça seu cartão gratuitamente' },
    ],
  },
  {
    id: 'gestao',
    title: 'Turbine sua gestão',
    icon: 'chart-pie',
    total: 2,
    done: 0,
    tasks: [
      { id: 'pix-maq', label: 'Ative o Pix na maquininha' },
      { id: 'dda', label: 'Ative o Buscador de Boletos (DDA)' },
    ],
  },
];

type OnboardingProps = {
  groups?: OnboardingGroup[];
};

export function OnboardingV1({ groups = DEFAULT_GROUPS }: OnboardingProps) {
  return (
    <Card padding="none">
      <div className={styles.header}>
        <Icon name="storefront" size={20} color="var(--jade-content-brand)" />
        <span className={`${styles.headerLabel} jade-text-small-overline`}>Comece por aqui</span>
      </div>
      {groups.map((group, gi) => (
        <div key={group.id} className={styles.group}>
          <div className={styles.groupHeader}>
            <Icon name={group.icon} size={20} />
            <span className={`${styles.groupTitle} jade-text-large-semibold`}>{group.title}</span>
            <Tag variant="neutral" size="small">{`${group.done} de ${group.total}`}</Tag>
          </div>
          <ul className={styles.tasks}>
            {group.tasks.map((task) => (
              <li key={task.id} className={styles.task}>
                <span className={styles.checkbox} aria-hidden="true">
                  {task.done ? (
                    <Icon name="check-circle-fill" size={20} color="var(--jade-bg-positive)" />
                  ) : (
                    <Icon name="circle" size={20} color="var(--jade-content-low)" />
                  )}
                </span>
                <span className={`${styles.taskLabel} jade-text-medium-regular`}>{task.label}</span>
                {task.badge ? (
                  <Tag variant={task.badge.variant}>{task.badge.label}</Tag>
                ) : (
                  <Icon name="chevron-right" size={16} color="var(--jade-content-low)" />
                )}
              </li>
            ))}
          </ul>
          {gi < groups.length - 1 && <hr className={styles.divider} />}
        </div>
      ))}
    </Card>
  );
}
