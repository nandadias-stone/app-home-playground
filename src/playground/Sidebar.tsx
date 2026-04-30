import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { usePlayground } from './PlaygroundContext';
import { SortableWidgetItem } from './SortableWidgetItem';
import { PresetsMenu } from './PresetsMenu';
import styles from './Sidebar.module.css';

type SidebarProps = {
  open?: boolean;
  onRequestClose?: () => void;
};

export function Sidebar({ open = true, onRequestClose }: SidebarProps) {
  const { config, toggleWidget, setVersion, reorder, reset, triggerRefresh } = usePlayground();

  const ids = config.widgets.map((w) => w.id);
  const enabledCount = config.widgets.filter((w) => w.enabled).length;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(active.id as (typeof ids)[number]);
    const to = ids.indexOf(over.id as (typeof ids)[number]);
    if (from === -1 || to === -1) return;
    reorder(from, to);
  };

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Playground</h2>
          <p className={styles.subtitle}>
            {enabledCount} de {config.widgets.length} widgets visíveis
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.refreshButton}
            onClick={triggerRefresh}
            aria-label="Recarregar widgets"
            title="Recarregar widgets (rever animações)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 12a9 9 0 1 1-3.5-7.13M21 4v5h-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {onRequestClose && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onRequestClose}
              aria-label="Fechar configuração"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      <div className={styles.presetsBar}>
        <PresetsMenu />
      </div>

      <div className={styles.list}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {config.widgets.map((widget) => (
              <SortableWidgetItem
                key={widget.id}
                widget={widget}
                onToggle={toggleWidget}
                onVersionChange={setVersion}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <footer className={styles.footer}>
        <button type="button" className={styles.resetButton} onClick={reset}>
          ↺ Resetar configuração
        </button>
      </footer>
    </aside>
  );
}
