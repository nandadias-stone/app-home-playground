import { Header } from '@/widgets/Header';
import { TabBar } from '@/widgets/TabBar';
import { usePlaygroundOptional, WIDGET_REGISTRY, DEFAULT_ORDER } from '@/playground';
import styles from './HomePage.module.css';

export function HomePage() {
  const playground = usePlaygroundOptional();

  // Sem provider (rota /): ordem default, todos visíveis, version v1
  const widgets = playground
    ? playground.config.widgets.filter((w) => w.enabled)
    : DEFAULT_ORDER.map((id) => ({
        id,
        enabled: true,
        version: WIDGET_REGISTRY[id].versions[0] ?? 'v1',
      }));

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        {widgets.map((w) => {
          const entry = WIDGET_REGISTRY[w.id];
          const Comp = entry.component;
          return <Comp key={w.id} version={w.version} />;
        })}
      </main>
      <TabBar />
    </div>
  );
}
