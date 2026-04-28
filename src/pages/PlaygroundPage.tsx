import { HomePage } from './HomePage';
import styles from './PlaygroundPage.module.css';

export function PlaygroundPage() {
  return (
    <div className={styles.stage}>
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
  );
}
