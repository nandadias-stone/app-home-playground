import styles from './Divider.module.css';

export function Divider({ className }: { className?: string }) {
  return <hr className={`${styles.divider} ${className ?? ''}`} />;
}
