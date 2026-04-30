import { useState } from 'react';
import { contactMethods } from '../data/data';

const contactIcons = {
  Phone: '☎',
  Email: '✉',
  LinkedIn: 'in',
  GitHub: '⌘'
};

function Contact({ setResumeOpen }) {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <section id="contact" className="section  matrix-section animate-on-scroll">
      <div className="wide-shell">
        <div className="contact-center-wrap">
          <article className="contact-center-card">
            <span className="contact-pill">Contact</span>

            <h2>Let&apos;s Talk</h2>

            <p className="contact-intro">
              Open to opportunities, collaborations, or just a good conversation.
            </p>

            <div className="contact-card-grid">
              <div className="contact-info-panel">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    className="contact-info-item"
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span className="contact-info-icon">
                      {contactIcons[method.label] || '•'}
                    </span>

                    <span>
                      <small>{method.label}</small>
                      <strong>{method.value}</strong>
                    </span>
                  </a>
                ))}

                
              </div>

              <div className="contact-profile-panel">
                <div className="contact-orbit">
                  <span className="orbit-dot orbit-dot-one" />
                  <span className="orbit-dot orbit-dot-two" />

                  <div className="contact-avatar-large">
                    <img
                      src="/assets/profile.png"
                      alt="Neo Monserrat"
                    />
                  </div>
                </div>

                <h3>Neo Monserrat</h3>
                <p className="contact-role">College Student</p>

                <div className="contact-socials">
               <a
                href="https://www.linkedin.com/in/antonio-enrique-monserrat-232ab6328"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                💼
              </a>

              <a
                href="https://github.com/NeoMonserrat"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                💻
              </a>

              <a
                href="mailto:neo.monserrat@gmail.com"
                aria-label="Email"
              >
                ✉
              </a>
                </div>
              </div>
            </div>

            <div className="contact-actions">
              <a href="mailto:neo.monserrat@gmail.com" className="btn btn-primary">
                Send Message →
              </a>

              <div className="resume-dropdown contact-dropdown">
                <button
                  type="button"
                  className="btn btn-secondary resume-btn"
                  onClick={() => setCvOpen(!cvOpen)}
                >
                  Download CV
                  <span className={`resume-chevron ${cvOpen ? 'open' : ''}`} />
                </button>

                <div className={`resume-menu ${cvOpen ? 'show' : ''}`}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setResumeOpen(false);
                      alert('ATS Version is not yet available.');
                    }}
                  >
                    ATS Version
                  </a>

                  <a
                    href="/assets/AntonioMonserrat_CV.pdf"
                    download
                    onClick={() => setCvOpen(false)}
                  >
                    Designed Version
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Contact;