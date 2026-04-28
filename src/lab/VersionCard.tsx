import { useEffect, useState } from 'react';
import { Switch } from '@/jade';
import { WIDGET_REGISTRY, type WidgetId } from '@/playground';
import { usePromotion } from './PromotionContext';
import styles from './VersionCard.module.css';

type VersionCardProps = {
  widgetId: WidgetId;
  version: string;
};

const CURRENT_LABEL = 'Atual';

export function VersionCard({ widgetId, version }: VersionCardProps) {
  const entry = WIDGET_REGISTRY[widgetId];
  const Comp = entry.component;
  const { isPromoted, togglePromotion, getMetadata, setLabel, hardDeleteVersion } =
    usePromotion();
  const promoted = isPromoted(widgetId, version);
  const meta = getMetadata(widgetId, version);
  const isV1 = version === 'v1';

  const [labelDraft, setLabelDraft] = useState(meta.label ?? '');

  useEffect(() => {
    setLabelDraft(meta.label ?? '');
  }, [widgetId, version, meta.label]);

  const flushLabel = () => {
    if ((meta.label ?? '') !== labelDraft) setLabel(widgetId, version, labelDraft);
  };

  const handleDelete = async () => {
    const nome = meta.label ? `"${meta.label}" (${version})` : version;
    const ok = window.confirm(
      `Excluir ${nome}?\n\nOs arquivos ${version}.tsx e ${version}.module.css serão APAGADOS PERMANENTEMENTE do disco.`,
    );
    if (!ok) return;
    try {
      await hardDeleteVersion(widgetId, version);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      window.alert(`Não foi possível excluir: ${message}`);
    }
  };

  return (
    <article className={`${styles.card} ${promoted ? styles.promoted : styles.draft}`}>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <span className={styles.versionTag}>{version}</span>
          {isV1 ? (
            <span className={`${styles.labelStatic} jade-text-large-semibold`}>
              {CURRENT_LABEL}
            </span>
          ) : (
            <input
              className={styles.labelInput}
              type="text"
              value={labelDraft}
              placeholder="Nomear esta versão…"
              onChange={(e) => setLabelDraft(e.target.value)}
              onBlur={flushLabel}
              onKeyDown={(e) => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                if (e.key === 'Escape') {
                  setLabelDraft(meta.label ?? '');
                  (e.target as HTMLInputElement).blur();
                }
              }}
            />
          )}
        </div>
        <div className={styles.actions}>
          <label className={styles.switchLabel}>
            <span className={`${styles.switchText} jade-text-small-medium`}>
              {promoted ? 'Disponível' : 'Draft'}
            </span>
            <Switch
              checked={promoted}
              onChange={() => togglePromotion(widgetId, version)}
              ariaLabel={`Promover ${version} para o playground`}
            />
          </label>
          {!isV1 && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
              aria-label={`Excluir ${version}`}
              title="Excluir versão"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M5.5 2.5h5l.5.5v1h2a.5.5 0 010 1H3a.5.5 0 010-1h2v-1l.5-.5zM6 4h4v-.5H6V4zM4.5 5.5h7l-.5 7.5a1 1 0 01-1 1H6a1 1 0 01-1-1l-.5-7.5zM7 7v5.5M9 7v5.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </header>

      <div className={styles.preview}>
        <div className={styles.frame}>
          <Comp version={version} />
        </div>
      </div>
    </article>
  );
}
