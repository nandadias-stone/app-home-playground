import { useState } from 'react';
import { DEFAULT_ORDER, type WidgetId } from '@/playground';
import { LabSidebar } from './LabSidebar';
import { VersionsGrid } from './VersionsGrid';
import styles from './LabPage.module.css';

export function LabPage() {
  const [activeId, setActiveId] = useState<WidgetId>(DEFAULT_ORDER[0]);

  return (
    <div className={styles.layout}>
      <LabSidebar activeId={activeId} onSelect={setActiveId} />
      <main className={styles.main}>
        <VersionsGrid widgetId={activeId} />
      </main>
    </div>
  );
}
