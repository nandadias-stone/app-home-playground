import { Header } from '@/widgets/Header';
import { TabBar } from '@/widgets/TabBar';
import {
  usePlaygroundOptional,
  WIDGET_REGISTRY,
  DEFAULT_ORDER,
  type PlaygroundConfig,
  type WidgetConfig,
} from '@/playground';
import styles from './HomePage.module.css';

type HomePageProps = {
  /** Override da config. Se omitido, lê do PlaygroundProvider (ou default). */
  config?: PlaygroundConfig;
  /** Key extra anexada na key dos widgets para forçar remount (animações). */
  refreshKey?: number;
};

function defaultWidgets(): WidgetConfig[] {
  return DEFAULT_ORDER.map((id) => ({
    id,
    enabled: true,
    version: WIDGET_REGISTRY[id].versions[0] ?? 'v1',
  }));
}

export function HomePage({ config, refreshKey: refreshKeyProp }: HomePageProps = {}) {
  const playground = usePlaygroundOptional();

  // Resolução de config: prop > provider > default
  const resolvedWidgets: WidgetConfig[] = config
    ? config.widgets
    : playground
      ? playground.config.widgets
      : defaultWidgets();

  const refreshKey = refreshKeyProp ?? playground?.refreshKey ?? 0;
  const enabled = resolvedWidgets.filter((w) => w.enabled);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        {enabled.map((w) => {
          const entry = WIDGET_REGISTRY[w.id];
          const Comp = entry.component;
          return <Comp key={`${w.id}-${refreshKey}`} version={w.version} />;
        })}
      </main>
      <TabBar />
    </div>
  );
}
