/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { useState } from 'react';
import { Card, IconShape, Switch } from '@/jade';
import styles from './v1.module.css';

type ToggleTonFastProps = {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  title?: string;
  description?: string;
};

export function ToggleTonFastV1({
  defaultChecked = false,
  onChange,
  title = 'Receba na hora',
  description = 'Dinheiro das vendas mais rápido',
}: ToggleTonFastProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <Card padding="medium" className={styles.card}>
      <IconShape icon="flash-fill" variant="positive-subtle" size="medium" />
      <div className={styles.body}>
        <p className={`${styles.title} jade-text-medium-semibold`}>{title}</p>
        <p className={`${styles.description} jade-text-small-regular`}>{description}</p>
      </div>
      <Switch checked={checked} onChange={handleChange} ariaLabel={title} />
    </Card>
  );
}
