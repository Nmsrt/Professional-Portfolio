import { experienceItems } from '../data/data';

function Experience() {
  return (
    <section id="experience" className="section matrix-section animate-on-scroll">
      <div className="wide-shell">
        <span className="matrix-section-num">01</span>
        <div className="experience-heading">
          <span className="eyebrow">Journey</span>
          <h2>My career & experience</h2>
        </div>

        <div className="experience-timeline">
          {experienceItems.map((item, index) => (
            <article className="timeline-item" key={item.title}>
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-dot" />

                {index !== experienceItems.length - 1 && (
                  <span className="timeline-line" />
                )}
              </div>

              <div className="timeline-content">
                <div className="timeline-main">
                  <h3>{item.title}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-location">{item.location}</p>
                  <p className="timeline-text">{item.text}</p>
                </div>

                <div className="timeline-year">
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