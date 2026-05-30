function Navbar({ menuOpen, setMenuOpen, activeSection }) {
  const navItems = [
    ['home',          '⌂',  'Home'],
    ['experience',    '◈',  'Exp'],
    ['tech',          '{}', 'Tech'],
    ['certifications','✦',  'Certs'],
    ['projects',      '▦',  'Work'],
    ['contact',       '✉',  'Talk'],
  ];

  return (
    <>
      {/* ════════════════════════════════════
          DESKTOP SIDEBAR  (hidden on mobile)
      ════════════════════════════════════ */}
      <aside className="sidebar" aria-label="Primary navigation">
        {/* Brand */}
        <a href="#home" className="sidebar-brand" aria-label="Neo Monserrat home">
          <div className="sidebar-avatar">
            <img src="/assets/Brand.png" alt="Neo" />
          </div>
          <div className="sidebar-brand-text">
            <strong>Neo</strong>
            <span>Portfolio</span>
          </div>
        </a>

        {/* Nav links */}
        <nav className="sidebar-nav">
          {navItems.map(([id, icon, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`sidebar-link${activeSection === id ? ' is-active' : ''}`}
              aria-label={label}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              <span className="sidebar-link-icon">{icon}</span>
              <span className="sidebar-link-label">{label}</span>
              {activeSection === id && <span className="sidebar-link-bar" aria-hidden="true" />}
            </a>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="sidebar-footer">
          <a href="#contact" className="sidebar-cta">
            Let&apos;s Talk
            <span>→</span>
          </a>
          <p className="sidebar-copy">© {new Date().getFullYear()}</p>
        </div>
      </aside>

      {/* ════════════════════════════════════
          MOBILE TOP BAR  (hidden on desktop)
      ════════════════════════════════════ */}
      <header className="mobile-topbar" aria-label="Mobile header">
        <a href="#home" className="brand" aria-label="Neo Monserrat home">
          <div className="brand-avatar">
            <img src="/assets/Brand.png" alt="Neo" />
          </div>
        </a>

        <button
          type="button"
          className="menu-button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile slide-out overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        className={`mobile-sidebar ${menuOpen ? 'is-open' : ''}`}
        aria-label="Mobile menu"
      >
        <div className="mobile-head">
          <div className="brand-avatar">
            <img src="/assets/Brand.png" alt="Neo" />
          </div>
          <button type="button" className="close-button" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <nav className="mobile-nav" onClick={() => setMenuOpen(false)}>
          {navItems.map(([id, , label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`mobile-link${activeSection === id ? ' is-active' : ''}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>
          Let&apos;s Talk →
        </a>
      </aside>

      {/* ════════════════════════════════════
          MOBILE BOTTOM NAV
      ════════════════════════════════════ */}
      <nav className="mbn" aria-label="Mobile navigation">
        {navItems.map(([id, icon, label]) => {
          const active = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className="mbn-item"
              data-active={active ? 'true' : undefined}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
            >
              <span className="mbn-icon">{icon}</span>
              <span className="mbn-label">{label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}

export default Navbar;
