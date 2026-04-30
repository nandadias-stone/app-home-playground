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

  // Separa fluxo normal vs flutuantes — flutuantes saem do .main e ficam
  // num slot sticky no fim do .app, independente da ordem do sidebar.
  const fixed: WidgetConfig[] = [];
  const flutuantes: WidgetConfig[] = [];
  for (const w of enabled) {
    const entry = WIDGET_REGISTRY[w.id];
    const forced = entry.versionForcedState?.[w.version];
    const stateId = forced ?? w.state ?? entry.states?.[0]?.id;
    if (stateId === 'flutuante') flutuantes.push(w);
    else fixed.push(w);
  }

  const renderWidget = (w: WidgetConfig) => {
    const entry = WIDGET_REGISTRY[w.id];
    const Comp = entry.component;
    return (
      <div
        key={`${w.id}-${refreshKey}`}
        className={styles.slot}
        data-widget={w.id}
      >
        <Comp version={w.version} />
      </div>
    );
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>{fixed.map(renderWidget)}</main>
      {flutuantes.length > 0 && (
        <div className={styles.flutuanteLayer} aria-label="Widgets flutuantes">
          {flutuantes.map(renderWidget)}
        </div>
      )}
      <TabBar />
    </div>
  );
}
