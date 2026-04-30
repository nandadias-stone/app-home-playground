import { TopNav } from '@/components/TopNav';
import { LabSidebar } from './LabSidebar';
import { VersionsGrid } from './VersionsGrid';
import { useActiveWidget } from './useActiveWidget';
import styles from './LabPage.module.css';

export function LabPage() {
  const [activeId, setActiveId] = useActiveWidget();

  return (
    <>
      <TopNav active="lab" />
      <div className={styles.layout}>
        <LabSidebar activeId={activeId} onSelect={setActiveId} />
        <main className={styles.main}>
          <VersionsGrid widgetId={activeId} />
        </main>
      </div>
    </>
  );
}
