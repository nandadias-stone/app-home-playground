import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Switch } from '@/jade';
import { usePromotionOptional } from '@/lab';
import { WIDGET_REGISTRY, type WidgetId } from './widget-registry';
import type { WidgetConfig } from './types';
import styles from './SortableWidgetItem.module.css';

type Props = {
  widget: WidgetConfig;
  onToggle: (id: WidgetId) => void;
  onVersionChange: (id: WidgetId, version: string) => void;
};

export function SortableWidgetItem({ widget, onToggle, onVersionChange }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: widget.id,
  });

  const entry = WIDGET_REGISTRY[widget.id];
  const promotion = usePromotionOptional();
  const availableVersions = promotion
    ? entry.versions.filter((v) => promotion.isPromoted(widget.id, v))
    : entry.versions;
  const hasMultipleVersions = availableVersions.length > 1;

  const formatVersionLabel = (version: string) => {
    const meta = promotion?.getMetadata(widget.id, version);
    const label = meta?.label?.trim() || (version === 'v1' ? 'Atual' : '');
    return label ? `${version} · ${label}` : version;
  };

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 1 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.item}>
      <button
        className={styles.handle}
        type="button"
        aria-label="Arrastar para reordenar"
        {...attributes}
        {...listeners}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="5" cy="4" r="1.2" fill="currentColor" />
          <circle cx="5" cy="8" r="1.2" fill="currentColor" />
          <circle cx="5" cy="12" r="1.2" fill="currentColor" />
          <circle cx="11" cy="4" r="1.2" fill="currentColor" />
          <circle cx="11" cy="8" r="1.2" fill="currentColor" />
          <circle cx="11" cy="12" r="1.2" fill="currentColor" />
        </svg>
      </button>

      <div className={styles.body}>
        <span className={styles.label}>{entry.label}</span>
        {hasMultipleVersions ? (
          <select
            className={styles.versionSelect}
            value={widget.version}
            onChange={(e) => onVersionChange(widget.id, e.target.value)}
          >
            {availableVersions.map((v) => (
              <option key={v} value={v}>
                {formatVersionLabel(v)}
              </option>
            ))}
          </select>
        ) : (
          <span className={styles.versionStatic}>{formatVersionLabel(widget.version)}</span>
        )}
      </div>

      <Switch
        checked={widget.enabled}
        onChange={() => onToggle(widget.id)}
        ariaLabel={`Mostrar ${entry.label}`}
      />
    </div>
  );
}
