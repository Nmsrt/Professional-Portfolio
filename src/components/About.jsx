import { about, profile, flightLog } from '../data/content';

/* About — bio alongside the portrait. Experience timeline is a
   separate section/panel directly below (see Experience()). */
function About() {
  return (
    <section id="briefing" className="section briefing">
      <div className="shell">
        <div className="section-panel">
          <div className="briefing-grid">
            {/* Portrait */}
            <div className="viewport" data-reveal="left" data-parallax="0.12">
              <div className="viewport-frame">
                <img src={profile.portrait} alt={`Portrait of ${profile.name}`} />
              </div>
              <div className="viewport-meta">
                <span>
                  <small>NAME</small>
                  <strong>{profile.fullName}</strong>
                </span>
                <span>
                  <small>PROGRAM</small>
                  <strong>{profile.discipline}</strong>
                </span>
              </div>
            </div>

            {/* Briefing copy */}
            <div className="briefing-copy">
              <p className="section-label" data-reveal>
                {about.label}
              </p>
              <h2 className="section-heading" data-reveal>
                {about.heading}
              </h2>
              <p className="lead" data-reveal>
                {about.lead}
              </p>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="body" data-reveal>
                  {p}
                </p>
              ))}

              <div className="stat-row" data-reveal-group>
                {about.stats.map((s) => (
                  <div key={s.label} className="stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Experience — flight-log timeline, own section panel. */
function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="shell">
        <div className="section-panel">
          <div className="flightlog">
            <p className="section-label" data-reveal>
              {flightLog.label}
            </p>
            <h3 className="flightlog-heading" data-reveal>
              {flightLog.heading}
            </h3>

            <ol className="timeline" data-reveal-group>
              {flightLog.entries.map((e) => (
                <li key={e.title} className="timeline-item">
                  <span className="timeline-node" aria-hidden="true" />
                  <span className="timeline-year">{e.year}</span>
                  <div className="timeline-body">
                    <h4>
                      {e.title} <span className="timeline-company">· {e.company}</span>
                    </h4>
                    <p className="timeline-loc">{e.location}</p>
                    <p>{e.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
export { Experience };
