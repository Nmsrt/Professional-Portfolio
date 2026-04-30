function Footer({ year }) {
  return (
    <footer className="site-footer">
      <div className="wide-shell footer-inner">
        <div className="footer-brand">
          <div className="brand-avatar">
            <img src="/assets/Brand.png" alt="Neo" />
          </div>

          <div>
            <div className="footer-name">Neo Monserrat</div>
            <div className="footer-meta">
              BS Computer Science · Software Technology
            </div>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <a href="tel:+639276646821">Phone</a>
          <a href="mailto:neo.monserrat@gmail.com">Email</a>

          <a
            href="https://www.linkedin.com/in/antonio-enrique-monserrat"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/NeoMonserrat"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>

        <div className="footer-copy">© {year}</div>
      </div>
    </footer>
  );
}

export default Footer;