function Hero() {
  return (
     <section id="home" className="hero-section">
          <div className="hero-frame">
            <div className="hero-noise" aria-hidden="true" />
            <div className="hero-grid-overlay" aria-hidden="true" />
            <div className="hero-spotlight" aria-hidden="true" />
            <div className="hero-orb hero-orb-1" aria-hidden="true" />
            <div className="hero-orb hero-orb-2" aria-hidden="true" />

            <div className="hero-grid wide-shell">
              <div className="hero-copy hero-copy-left">
                <div className="hero-chip-row">
                  <span className="hero-chip">Portfolio</span>
                </div>

                <h1 className="hero-title hero-title-main">
                  Hello World<span className="hero-accent">!</span>
                </h1>

                <h2 className="hero-title hero-title-sub">I&apos;m Neo</h2>

                <p className="hero-role">
                  BS Computer Science Student passionate about software development and building thoughtful,
                  impactful projects.
                </p>

                <div className="hero-actions hero-actions-acid">
                  <a href="/assets/AntonioMonserrat_CV.pdf" download className="btn btn-accent btn-lg">
                    <span>↓</span>
                    Download Resume
                  </a>

                  <a href="#projects" className="btn btn-ghost-accent btn-lg">
                    View Projects
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-visual-ring hero-visual-ring-1" aria-hidden="true" />
                <div className="hero-visual-ring hero-visual-ring-2" aria-hidden="true" />

                <div className="hero-portrait-card">
                  <img src="/assets/profile-illustration.png" alt="Neo portrait" className="hero-portrait-image" />
                </div>
              </div>
            </div>

          </div>
        </section>
  );
}

export default Hero;