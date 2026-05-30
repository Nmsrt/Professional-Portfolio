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
      {/* ── DESKTOP SIDEBAR (display:none on mobile via CSS) ── */}
      <aside className="sidebar" aria-label="Primary navigation">
        <a href="#home" className="sidebar-brand" aria-label="Neo Monserrat home">
          <div className="sidebar-avatar">
            <img src="/assets/Brand.png" alt="Neo" />
          </div>
          <div className="sidebar-brand-text">
            <strong>Neo</strong>
            <span>Portfolio</span>
          </div>
        </a>

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

        <div className="sidebar-footer">
          <a href="#contact" className="sidebar-cta">
            Let&apos;s Talk <span>→</span>
          </a>
          <p className="sidebar-copy">© {new Date().getFullYear()}</p>
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV ONLY (display:none on desktop via CSS) ── */}
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
