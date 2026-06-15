import { profile, navItems } from '../data/content';

/* HUD navigation: a top command bar (desktop) + a compact waypoint dock (mobile). */
function Navbar({ activeId }) {
  return (
    <>
      <header className="hud-bar" data-hud>
        <a href="#launch" className="hud-brand" aria-label={`${profile.name} — home`}>
          <span className="hud-brand-mark">
            <img src={profile.brand} alt="" aria-hidden="true" />
          </span>
          <span className="hud-brand-text">
            <strong>NEO</strong>
            <small>MONSERRAT</small>
          </span>
        </a>

        <nav className="hud-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`hud-link${activeId === item.id ? ' is-active' : ''}`}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              <span className="hud-link-glyph" aria-hidden="true">
                {item.glyph}
              </span>
              <span className="hud-link-label">{item.label}</span>
            </a>
          ))}
        </nav>

        <a href="#transmit" className="hud-cta">
          Contact <span aria-hidden="true">↗</span>
        </a>
      </header>

      {/* Mobile waypoint dock */}
      <nav className="dock" aria-label="Section navigation">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`dock-item${activeId === item.id ? ' is-active' : ''}`}
            aria-label={item.label}
            aria-current={activeId === item.id ? 'true' : undefined}
          >
            <span className="dock-glyph" aria-hidden="true">
              {item.glyph}
            </span>
            <span className="dock-label">{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}

export default Navbar;
