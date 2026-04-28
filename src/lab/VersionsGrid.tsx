import { WIDGET_REGISTRY, type WidgetId } from '@/playground';
import { VersionCard } from './VersionCard';
import styles from './VersionsGrid.module.css';

type VersionsGridProps = {
  widgetId: WidgetId;
};

export function VersionsGrid({ widgetId }: VersionsGridProps) {
  const entry = WIDGET_REGISTRY[widgetId];
  const versions = entry.versions;

  return (
    <section className={styles.grid}>
      <header className={styles.title}>
        <h1 className={styles.heading}>{entry.label}</h1>
        <p className={styles.summary}>
          {versions.length} {versions.length === 1 ? 'versão criada' : 'versões criadas'}
        </p>
      </header>

      {versions.length === 0 ? (
        <p className={styles.empty}>Nenhuma versão deste widget foi encontrada.</p>
      ) : (
        <div className={styles.cards}>
          {versions.map((version) => (
            <VersionCard key={version} widgetId={widgetId} version={version} />
          ))}
        </div>
      )}

      <footer className={styles.help}>
        <p className={styles.helpTitle}>Como adicionar uma nova versão</p>
        <ol className={styles.helpSteps}>
          <li>
            Duplique <code>v{versions.length || 1}.tsx</code> e{' '}
            <code>v{versions.length || 1}.module.css</code> em{' '}
            <code>src/widgets/{firstFolderName(entry.label)}/</code>
          </li>
          <li>
            Renomeie a função interna para <code>{firstFolderName(entry.label)}V{versions.length + 1}</code>
          </li>
          <li>Salve. Esta página detecta automaticamente.</li>
        </ol>
      </footer>
    </section>
  );
}

function firstFolderName(label: string): string {
  // Heurística simples para sugerir o nome da pasta a partir do label
  return label
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[·.]/g, '')
    .split(/\s+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');
}
