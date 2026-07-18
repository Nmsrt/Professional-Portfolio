import { profile, footer, transmission } from '../data/content';

function Footer({ year }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-sign">{footer.sign}</div>

        <div className="footer-id">
          <span className="footer-name">{profile.name}</span>
          <span className="footer-meta">{footer.meta}</span>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {transmission.channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel={ch.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {ch.label}
            </a>
          ))}
        </nav>

        <div className="footer-copy">© {year} · {profile.fullName}</div>
      </div>
    </footer>
  );
}

export default Footer;
