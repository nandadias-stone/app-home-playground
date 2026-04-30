import { useEffect, useRef, useState } from 'react';
import { usePlayground } from './PlaygroundContext';
import styles from './PresetsMenu.module.css';

export function PresetsMenu() {
  const {
    presets,
    activePresetId,
    activePreset,
    isModified,
    savePresetAs,
    loadPreset,
    updateActivePreset,
    deletePreset,
    renamePreset,
    duplicatePreset,
    clearActivePreset,
  } = usePlayground();

  const [open, setOpen] = useState(false);
  const [openOverflowId, setOpenOverflowId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open && openOverflowId === null) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setOpenOverflowId(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open, openOverflowId]);

  const activeName = activePreset?.name ?? 'Padrão';

  const handleSaveAs = () => {
    const name = window.prompt('Nome do cenário:');
    if (!name?.trim()) return;
    savePresetAs(name.trim());
    setOpen(false);
  };

  const handleRename = (id: string, currentName: string) => {
    const name = window.prompt('Renomear cenário:', currentName);
    if (name?.trim()) renamePreset(id, name.trim());
    setOpenOverflowId(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Excluir cenário "${name}"?`)) {
      deletePreset(id);
    }
    setOpenOverflowId(null);
  };

  const handleDuplicate = (id: string) => {
    duplicatePreset(id);
    setOpenOverflowId(null);
  };

  return (
    <div className={styles.wrap} ref={dropdownRef}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className={styles.triggerLabel}>
            <span className={styles.triggerName}>{activeName}</span>
            {isModified && <span className={styles.modifiedBadge} aria-label="Modificado" />}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className={`${styles.caret} ${open ? styles.caretOpen : ''}`}
          >
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {activePresetId && isModified && (
          <button
            type="button"
            className={styles.saveButton}
            onClick={updateActivePreset}
            title="Salvar mudanças no cenário ativo"
          >
            Salvar
          </button>
        )}
      </div>

      {open && (
        <div className={styles.menu} role="menu">
          <button
            type="button"
            role="menuitem"
            className={`${styles.menuItem} ${activePresetId === null ? styles.menuItemActive : ''}`}
            onClick={() => {
              clearActivePreset();
              setOpen(false);
            }}
          >
            <span>Padrão</span>
          </button>
          {presets.length > 0 && <hr className={styles.divider} />}
          {presets.map((p) => (
            <div key={p.id} className={styles.menuRow}>
              <button
                type="button"
                role="menuitem"
                className={`${styles.menuItem} ${p.id === activePresetId ? styles.menuItemActive : ''}`}
                onClick={() => {
                  loadPreset(p.id);
                  setOpen(false);
                }}
              >
                <span>{p.name}</span>
              </button>
              <div className={styles.overflowWrap}>
                <button
                  type="button"
                  className={styles.overflowButton}
                  aria-label={`Opções de ${p.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenOverflowId(openOverflowId === p.id ? null : p.id);
                  }}
                >
                  ⋯
                </button>
                {openOverflowId === p.id && (
                  <div className={styles.overflowMenu} role="menu">
                    <button
                      type="button"
                      role="menuitem"
                      className={styles.overflowItem}
                      onClick={() => handleRename(p.id, p.name)}
                    >
                      Renomear
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className={styles.overflowItem}
                      onClick={() => handleDuplicate(p.id)}
                    >
                      Duplicar
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className={`${styles.overflowItem} ${styles.overflowItemDanger}`}
                      onClick={() => handleDelete(p.id, p.name)}
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <hr className={styles.divider} />
          <button
            type="button"
            role="menuitem"
            className={`${styles.menuItem} ${styles.menuItemAction}`}
            onClick={handleSaveAs}
          >
            <span>+ Salvar como…</span>
          </button>
        </div>
      )}
    </div>
  );
}
