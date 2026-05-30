function Hero({ resumeOpen, setResumeOpen }) {
  return (
    <section id="home" className="hero-section animate-on-scroll">
      <div className="hero-frame">
        {/* Keep all ambient layers — green highlight restored */}
        <div className="hero-noise"        aria-hidden="true" />
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="hero-spotlight"    aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />

        <div className="hero-grid wide-shell">

          {/* ── LEFT: portrait (mobile: top half) ── */}
          <div className="hero-visual">
            <div className="hero-visual-ring hero-visual-ring-1" aria-hidden="true" />
            <div className="hero-visual-ring hero-visual-ring-2" aria-hidden="true" />
            <div className="hero-portrait-card">
              <img
                src="/assets/profile-illustration.png"
                alt="Neo portrait"
                className="hero-portrait-image"
              />
            </div>
          </div>

          {/* ── RIGHT: copy (mobile: bottom half) ── */}
          <div className="hero-copy hero-copy-left">
            <div className="hero-chip-row">
              <span className="hero-chip">Portfolio</span>
              <span className="hero-chip hero-chip-muted">BS CS · DLSU</span>
            </div>

            <h1 className="hero-title hero-title-main">
              Hello<br />World<span className="hero-accent">!</span>
            </h1>

            <h2 className="hero-title hero-title-sub">I&apos;m Neo</h2>

            <p className="hero-role">
              Computer Science student building thoughtful software.
            </p>

            <div className="hero-actions hero-actions-acid">
              <div className="resume-dropdown">
                <button
                  type="button"
                  className="btn btn-accent btn-lg resume-btn"
                  onClick={() => setResumeOpen(!resumeOpen)}
                >
                  <span>↓</span> Resume
                  <span className={`resume-chevron ${resumeOpen ? 'open' : ''}`} />
                </button>

                <div className={`resume-menu ${resumeOpen ? 'show' : ''}`}>
                  <a
                    href="/assets/AntonioMonserrat_CV_ATS.pdf"
                    download
                    onClick={() => setResumeOpen(false)}
                  >
                    ATS Version
                  </a>
                  <a
                    href="/assets/AntonioMonserrat_CV_Designed.pdf"
                    download
                    onClick={() => setResumeOpen(false)}
                  >
                    Designed Version
                  </a>
                </div>
              </div>

              <a href="#projects" className="btn btn-ghost-accent btn-lg">
                Projects <span>→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
