import { contactMethods, socials } from '../data/data';

function Contact() {
  return (
<section id="contact" className="section">
          <div className="wide-shell">
            <div className="contact-layout">
              <div className="contact-copy">
                <div className="section-header left-tight">
                  <span className="eyebrow">Contact</span>
                  <h2>Leave Me A Message</h2>
                  <p>
                    Open to internship opportunities, collaborations, or just chatting about games, sports, music, and
                    tech.
                  </p>
                </div>

                <div className="chip-row">
                  <span className="chip">✅ Open for internships</span>
                  <span className="chip">⏱ Usually replies in 24–48h</span>
                </div>

                <div className="action-row action-row-contact">
                  <a href="mailto:neo.monserrat@gmail.com" className="btn btn-primary">
                    Email Me
                  </a>
                  <a href="/assets/AntonioMonserrat_CV.pdf" download className="btn btn-secondary">
                    Download CV
                  </a>
                </div>

                <p className="contact-note">
                  Prefer email for anything formal. For quick questions, message me through any social media platform.
                </p>
              </div>

              <article className="card contact-card">
                <div className="contact-avatar">NM</div>
                <h3>Neo Monserrat</h3>
                <p className="contact-role">College Student</p>
                <p className="contact-location">📍 Manila &amp; Cavite · PH</p>

                <div className="contact-method-list">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      className="contact-method"
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      <span className="contact-method-label">{method.label}</span>
                      <strong>{method.value}</strong>
                    </a>
                  ))}
                </div>

                <div className="social-grid">
                  {socials.map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="social-pill">
                      {social.name}
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
  );
}

export default Contact;