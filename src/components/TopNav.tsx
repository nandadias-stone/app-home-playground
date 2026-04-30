import styles from './TopNav.module.css';

type Tab = {
  id: 'app' | 'playground' | 'lab';
  label: string;
  href: string;
};

const TABS: Tab[] = [
  { id: 'app', label: 'App', href: '/' },
  { id: 'playground', label: 'Playground', href: '/playground' },
  { id: 'lab', label: 'Lab', href: '/lab' },
];

type TopNavProps = {
  active: 'app' | 'playground' | 'lab';
};

export function TopNav({ active }: TopNavProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    if (window.location.pathname === href) return;
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.brandMark} aria-hidden="true" />
        <span className={styles.brandLabel}>Stone · Home</span>
      </div>
      <nav className={styles.tabs} aria-label="Navegação principal">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={(e) => handleClick(e, tab.href)}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
