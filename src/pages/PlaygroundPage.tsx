import { useState } from 'react';
import { HomePage } from './HomePage';
import { PlaygroundProvider, Sidebar } from '@/playground';
import { TopNav } from '@/components/TopNav';
import styles from './PlaygroundPage.module.css';

export function PlaygroundPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <PlaygroundProvider>
      <TopNav active="playground" />
      <div className={styles.layout}>
        <Sidebar open={sidebarOpen} onRequestClose={() => setSidebarOpen(false)} />

        <div className={styles.stage}>
          <button
            type="button"
            className={styles.openSidebarButton}
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir configuração"
          >
            ☰ Configurar
          </button>

          <div className={styles.header}>
            <p className={styles.title}>Playground · Home Jade</p>
            <p className={styles.subtitle}>iPhone 13/14 · 390 × 844</p>
          </div>

          <div className={styles.deviceWrap}>
            <div className={styles.device}>
              <div className={styles.notch} aria-hidden="true">
                <span className={styles.speaker} />
                <span className={styles.camera} />
              </div>
              <div className={styles.viewport}>
                <HomePage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PlaygroundProvider>
  );
}
