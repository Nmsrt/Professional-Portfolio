import { useState } from 'react';
import { profile } from '../data/content';

/* Launch sequence — the entrance. Text materializes from masks via GSAP. */
function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section id="launch" className="section hero">
      <div className="hero-inner">
        <p className="eyebrow" data-hero-fade>
          <span className="eyebrow-dot" /> {profile.callsign} · INITIATING LAUNCH SEQUENCE
        </p>

        <h1 className="hero-title">
          <span className="line-mask">
            <span className="line line-sm" data-hero-line>
              Hello, voyager. I&apos;m
            </span>
          </span>
          <span className="line-mask">
            <span className="line line-xl" data-hero-line>
              NEO
            </span>
          </span>
          <span className="line-mask">
            <span className="line line-xl line-outline" data-hero-line>
              MONSERRAT
            </span>
          </span>
        </h1>

        <p className="hero-role" data-hero-fade>
          {profile.role}
        </p>
        <p className="hero-tagline" data-hero-fade>
          {profile.tagline}
        </p>

        <div className="hero-actions" data-hero-fade>
          <a href="#briefing" className="btn btn-primary">
            Begin Journey <span aria-hidden="true">↓</span>
          </a>
          <a href="#missions" className="btn btn-ghost">
            View Missions <span aria-hidden="true">→</span>
          </a>

          <div className={`resume ${resumeOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="btn btn-ghost resume-trigger"
              onClick={() => setResumeOpen((v) => !v)}
              aria-expanded={resumeOpen}
            >
              Resume <span className="resume-caret" aria-hidden="true" />
            </button>
            <div className="resume-menu" role="menu">
              {profile.resumes.map((r) => (
                <a key={r.href} href={r.href} download role="menuitem" onClick={() => setResumeOpen(false)}>
                  {r.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a href="#briefing" className="scroll-cue" data-hero-cue aria-label="Scroll to begin">
        <span>SCROLL TO ENGAGE</span>
        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
      </a>
    </section>
  );
}

export default Hero;
