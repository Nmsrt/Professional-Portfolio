function Navbar({ menuOpen, setMenuOpen, NavLinks }) {
  return (
    <>
      <header className="topbar-shell">
        <div className="topbar">
          <a href="#home" className="brand" aria-label="Neo Monserrat home">
            <div className="brand-avatar">
              <img src="/assets/Brand.png" alt="Neo" />
            </div>

            <div className="brand-text">
              <strong>Neo</strong>
              <span>Portfolio</span>
            </div>
          </a>

          <nav className="topbar-nav" aria-label="Primary navigation">
            <NavLinks />
          </nav>

          <div className="topbar-right">
            <a className="topbar-cta" href="#contact">
              Let&apos;s Talk
            </a>

            <button
              type="button"
              className="menu-button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

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

          <button
            type="button"
            className="close-button"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="mobile-nav">
          <NavLinks mobile />
        </nav>

        <a
          className="mobile-cta"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Let&apos;s Talk
        </a>
      </aside>
    </>
  );
}

export default Navbar;