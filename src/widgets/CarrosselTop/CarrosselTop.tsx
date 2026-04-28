import { Card, IconShape, Tag } from '@/jade';
import styles from './CarrosselTop.module.css';

type CarrosselItem = {
  id: string;
  title: string;
  description: string;
  badge?: { label: string; variant: 'info' | 'positive' | 'warning' };
};

const DEFAULT_ITEMS: CarrosselItem[] = [
  {
    id: 'boletos',
    title: 'Buscador de boletos',
    description: 'Encontre todos os boletos registrados em seu nome.',
    badge: { label: 'Grátis', variant: 'info' },
  },
];

type CarrosselTopProps = {
  items?: CarrosselItem[];
};

export function CarrosselTop({ items = DEFAULT_ITEMS }: CarrosselTopProps) {
  return (
    <div className={styles.scroller}>
      {items.map((item) => (
        <Card key={item.id} padding="medium" className={styles.card}>
          <IconShape icon="barcode" variant="brand-subtle" size="medium" />
          <div className={styles.body}>
            <p className={`${styles.title} jade-text-medium-semibold`}>{item.title}</p>
            <p className={`${styles.description} jade-text-small-regular`}>{item.description}</p>
          </div>
          {item.badge && <Tag variant={item.badge.variant}>{item.badge.label}</Tag>}
        </Card>
      ))}
    </div>
  );
}
