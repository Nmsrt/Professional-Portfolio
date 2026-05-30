import { experienceItems } from '../data/data';

function Experience() {
  return (
    <section id="experience" className="section matrix-section animate-on-scroll">
      <div className="wide-shell">
        <span className="matrix-section-num">01</span>

        {/* Desktop heading */}
        <div className="experience-heading hide-mobile">
          <span className="eyebrow">Journey</span>
          <h2>My career &amp; experience</h2>
        </div>

        {/* Mobile heading */}
        <div className="mob-section-head show-mobile">
          <span className="mob-eyebrow">Journey</span>
          <h2 className="mob-h2">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="experience-timeline">
          {experienceItems.map((item, index) => (
            <article className="timeline-item" key={item.title}>
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-dot" />
                {index !== experienceItems.length - 1 && <span className="timeline-line" />}
              </div>

              <div className="timeline-content">
                <div className="timeline-main">
                  {/* Mobile: year inline with title */}
                  <div className="timeline-title-row">
                    <h3>{item.title}</h3>
                    <span className="mob-year-badge">{item.year}</span>
                  </div>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-location">{item.location}</p>
                  <p className="timeline-text">{item.text}</p>
                </div>

                {/* Desktop year column */}
                <div className="timeline-year hide-mobile">
                  <span>{item.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
