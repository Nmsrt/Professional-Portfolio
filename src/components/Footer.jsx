function Footer({ year }) {
  return (
    <footer className="site-footer">
        <div className="wide-shell footer-inner">
          <div>
            <div className="footer-name">Neo Monserrat</div>
            <div className="footer-meta">BS Computer Science - Major in Software Technology</div>
          </div>

          <div className="footer-links">
            <a href="tel:+639276646821">Phone</a>
            <a href="mailto:neo.monserrat@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/antonio-enrique-monserrat" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/NeoMonserrat" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

          <div className="footer-copy">© {year}</div>
        </div>
      </footer>
  );
}

export default Footer;