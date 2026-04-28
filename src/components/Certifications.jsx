import { certifications } from '../data/data';

function Certifications() {
 return (
  <section id="certifications" className="section certifications-section">
    <div className="wide-shell">
      <div className="section-header center">
        <span className="eyebrow">Credentials</span>
        <h2>Certifications</h2>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert) => (
          <article className="card certification-card" key={cert.title}>
            <div className="certification-top">
              <span className="certification-badge">Certificate</span>
              <span className="certification-date">{cert.date}</span>
            </div>

            <h3>{cert.title}</h3>
            <p className="certification-issuer">{cert.issuer}</p>
            <p>{cert.description}</p>

            <div className="chip-row">
              {cert.skills.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>

            <a className="certification-link" href={cert.link} target="_blank" rel="noreferrer">
              View Credential →
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);
}

export default Certifications;