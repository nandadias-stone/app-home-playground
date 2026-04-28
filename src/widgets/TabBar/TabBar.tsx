import { Icon, type IconName } from '@/jade';
import styles from './TabBar.module.css';

type Tab = {
  id: string;
  label: string;
  icon: IconName;
  iconActive?: IconName;
};

const DEFAULT_TABS: Tab[] = [
  { id: 'inicio', label: 'Início', icon: 'house', iconActive: 'house-fill' },
  { id: 'extrato', label: 'Extrato', icon: 'note-text' },
  { id: 'recebimentos', label: 'Recebimentos', icon: 'calendar' },
  { id: 'vendas', label: 'Vendas', icon: 'storefront' },
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
          const iconName = isActive && tab.iconActive ? tab.iconActive : tab.icon;
          return (
            <li key={tab.id} className={styles.item}>
              <button
                className={`${styles.btn} ${isActive ? styles.active : ''}`}
                type="button"
                onClick={() => onChange?.(tab.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  name={iconName}
                  size={24}
                  color={isActive ? 'var(--jade-content-brand)' : 'var(--jade-content-medium)'}
                />
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
