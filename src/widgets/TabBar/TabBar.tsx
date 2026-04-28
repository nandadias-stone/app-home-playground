import { IconAsset, ICON_MENU_BOTTOM } from '@/jade';
import styles from './TabBar.module.css';

type Tab = {
  id: string;
  label: string;
  /** Nome do arquivo em src/assets/icons/menu-bottom/ (sem .svg) */
  asset: string;
};

const DEFAULT_TABS: Tab[] = [
  { id: 'inicio', label: 'Início', asset: 'home' },
  { id: 'extrato', label: 'Extrato', asset: 'extrato' },
  { id: 'recebimentos', label: 'Recebimentos', asset: 'recebimentos' },
  { id: 'vendas', label: 'Vendas', asset: 'vendas' },
];

type TabBarProps = {
  tabs?: Tab[];
  active?: string;
  onChange?: (id: string) => void;
};

export function TabBar({ tabs = DEFAULT_TABS, active = 'inicio', onChange }: TabBarProps) {
  return (
    <nav className={styles.bar}>
      <ul className={styles.list}>
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const url = ICON_MENU_BOTTOM[tab.asset];
          return (
            <li key={tab.id} className={styles.item}>
              <button
                className={`${styles.btn} ${isActive ? styles.active : ''}`}
                type="button"
                onClick={() => onChange?.(tab.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                {url && (
                  <IconAsset
                    src={url}
                    size={24}
                    color={
                      isActive
                        ? 'var(--jade-content-brand)'
                        : 'var(--jade-content-medium)'
                    }
                  />
                )}
                <span className={styles.label}>{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className={styles.homeIndicator} aria-hidden="true" />
    </nav>
  );
}
