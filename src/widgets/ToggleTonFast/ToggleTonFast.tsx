import { useState } from 'react';
import { Card, IconShape, Switch } from '@/jade';
import styles from './ToggleTonFast.module.css';

type ToggleTonFastProps = {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  title?: string;
  description?: string;
};

export function ToggleTonFast({
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
