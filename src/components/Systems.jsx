import { systems } from '../data/content';

/* Systems & Capabilities — skills reframed as onboard ship modules,
   certifications as security clearances. */
function Systems() {
  return (
    <section id="systems" className="section systems">
      <div className="shell">
        <div className="section-head">
          <p className="section-label" data-reveal>
            <span className="label-glyph">⬡</span> {systems.label}
          </p>
          <h2 className="section-heading" data-reveal>
            {systems.heading}
          </h2>
          <p className="lead" data-reveal>
            {systems.lead}
          </p>
        </div>

        <div className="modules" data-reveal-group>
          {systems.modules.map((mod) => (
            <article key={mod.code} className="module-card">
              <header className="module-head">
                <span className="module-code">{mod.code}</span>
                <span className="module-status">
                  <span className="status-led" /> ONLINE
                </span>
              </header>
              <h3 className="module-name">{mod.system}</h3>
              <p className="module-sub">{mod.group.title}</p>

              <ul className="chip-grid">
                {mod.group.items.map((item) => (
                  <li key={item.name} className="chip">
                    <img src={item.icon} alt="" aria-hidden="true" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Clearances / certifications */}
        <div className="clearances" data-reveal-group>
          {systems.certifications.map((cert) => (
            <a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="clearance-card"
            >
              <span className="clearance-tag">CLEARANCE</span>
              <h4>{cert.title}</h4>
              <p className="clearance-meta">
                {cert.issuer} · {cert.date}
              </p>
              <p className="clearance-desc">{cert.description}</p>
              <div className="clearance-skills">
                {cert.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <span className="clearance-open">View credential ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Systems;
