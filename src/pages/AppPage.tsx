import { useEffect, useRef, useState } from 'react';
import { TopNav } from '@/components/TopNav';
import { HomePage } from './HomePage';
import {
  type PlaygroundConfig,
  type WidgetConfig,
  WIDGET_REGISTRY,
  DEFAULT_ORDER,
} from '@/playground';
import styles from './AppPage.module.css';

const PRESETS_STORAGE_KEY = 'stone-playground-presets-v1';
const ACTIVE_VIEW_KEY = 'stone-app-active-view';

type StoredPreset = {
  id: string;
  name: string;
  config: PlaygroundConfig;
  createdAt: number;
  updatedAt: number;
};

type StoredPresetsState = {
  presets?: StoredPreset[];
};

function loadPresets(): StoredPreset[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PRESETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredPresetsState;
    return Array.isArray(parsed?.presets) ? parsed.presets : [];
  } catch {
    return [];
  }
}

function loadActiveView(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ACTIVE_VIEW_KEY);
}

function persistActiveView(id: string | null) {
  try {
    if (id === null) window.localStorage.removeItem(ACTIVE_VIEW_KEY);
    else window.localStorage.setItem(ACTIVE_VIEW_KEY, id);
  } catch {
    // ignora
  }
}

function defaultConfig(): PlaygroundConfig {
  const widgets: WidgetConfig[] = DEFAULT_ORDER.map((id) => ({
    id,
    enabled: true,
    version: WIDGET_REGISTRY[id].versions[0] ?? 'v1',
  }));
  return { widgets };
}

export function AppPage() {
  const [presets, setPresets] = useState<StoredPreset[]>(() => loadPresets());
  const [activeViewId, setActiveViewId] = useState<string | null>(() => loadActiveView());
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Re-lê os presets quando outra aba ou sessão atualiza o localStorage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === PRESETS_STORAGE_KEY) setPresets(loadPresets());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    persistActiveView(activeViewId);
  }, [activeViewId]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // Se a view ativa foi removida, reseta
  useEffect(() => {
    if (activeViewId && !presets.some((p) => p.id === activeViewId)) {
      setActiveViewId(null);
    }
  }, [activeViewId, presets]);

  const activePreset = activeViewId ? presets.find((p) => p.id === activeViewId) ?? null : null;
  const activeName = activePreset?.name ?? 'Padrão';
  const config = activePreset?.config ?? defaultConfig();

  const selectView = (id: string | null) => {
    setActiveViewId(id);
    setOpen(false);
  };

  return (
    <>
      <TopNav active="app" />
      <div className={styles.stage}>
        <div className={styles.header}>
          <p className={styles.title}>App · Home Jade</p>
          <div className={styles.viewerWrap} ref={dropdownRef}>
            <span className={styles.viewerLabel}>Visualizando</span>
            <button
              type="button"
              className={styles.viewerTrigger}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              <span className={styles.viewerName}>{activeName}</span>
              <svg
                width="12"
                height="12"
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
            {open && (
              <div className={styles.viewerMenu} role="menu">
                <button
                  type="button"
                  role="menuitem"
                  className={`${styles.menuItem} ${activeViewId === null ? styles.menuItemActive : ''}`}
                  onClick={() => selectView(null)}
                >
                  Padrão
                </button>
                {presets.length > 0 && <hr className={styles.divider} />}
                {presets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="menuitem"
                    className={`${styles.menuItem} ${p.id === activeViewId ? styles.menuItemActive : ''}`}
                    onClick={() => selectView(p.id)}
                  >
                    {p.name}
                  </button>
                ))}
                {presets.length === 0 && (
                  <p className={styles.emptyHint}>
                    Nenhum cenário salvo. Crie um no Playground.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.deviceWrap}>
          <div className={styles.device}>
            <div className={styles.notch} aria-hidden="true">
              <span className={styles.speaker} />
              <span className={styles.camera} />
            </div>
            <div className={styles.viewport}>
              <HomePage config={config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
