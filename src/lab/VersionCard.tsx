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
const COPY_FEEDBACK_MS = 1500;

export function VersionCard({ widgetId, version }: VersionCardProps) {
  const entry = WIDGET_REGISTRY[widgetId];
  const Comp = entry.component;
  const { isPromoted, togglePromotion, getMetadata, setLabel, hardDeleteVersion } =
    usePromotion();
  const promoted = isPromoted(widgetId, version);
  const meta = getMetadata(widgetId, version);
  const isV1 = version === 'v1';
  const idText = `${widgetId}:${version}`;

  const [labelDraft, setLabelDraft] = useState(meta.label ?? '');
  const [refreshKey, setRefreshKey] = useState(0);
  const [justCopied, setJustCopied] = useState(false);

  useEffect(() => {
    setLabelDraft(meta.label ?? '');
  }, [widgetId, version, meta.label]);

  useEffect(() => {
    if (!justCopied) return;
    const t = setTimeout(() => setJustCopied(false), COPY_FEEDBACK_MS);
    return () => clearTimeout(t);
  }, [justCopied]);

  const flushLabel = () => {
    if ((meta.label ?? '') !== labelDraft) setLabel(widgetId, version, labelDraft);
  };

  const handleCopyId = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(idText);
      } else {
        // Fallback antigo
        const ta = document.createElement('textarea');
        ta.value = idText;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setJustCopied(true);
    } catch {
      // ignora
    }
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
          <button
            type="button"
            className={`${styles.idChip} ${justCopied ? styles.idChipCopied : ''}`}
            onClick={handleCopyId}
            title={justCopied ? 'Copiado!' : `Copiar ID (${idText})`}
            aria-label={justCopied ? 'ID copiado' : `Copiar ID ${idText}`}
          >
            <span className={styles.idChipText}>{idText}</span>
            <span className={styles.idChipIcon} aria-hidden="true">
              {justCopied ? (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="4"
                    y="4"
                    width="9"
                    height="10"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3 11V3.5A1.5 1.5 0 014.5 2H10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
          </button>
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
          <button
            type="button"
            className={styles.refreshButton}
            onClick={() => setRefreshKey((k) => k + 1)}
            aria-label="Recarregar pré-visualização"
            title="Recarregar (rever animação)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 12a9 9 0 1 1-3.5-7.13M21 4v5h-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
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

      {entry.states && entry.states.length > 0 && (
        <div className={styles.statesRow}>
          <span className={styles.statesLabel}>Estados:</span>
          {entry.states.map((s) => (
            <span key={s.id} className={styles.stateChip}>
              {s.label}
            </span>
          ))}
        </div>
      )}

      <div className={styles.preview}>
        <div className={styles.frame}>
          <Comp key={refreshKey} version={version} />
        </div>
      </div>
    </article>
  );
}
