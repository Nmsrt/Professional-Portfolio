import { useRef } from 'react';
import { missions } from '../data/content';
import useReducedMotion from '../hooks/useReducedMotion';

/* A single destination card with pointer-driven tilt + spotlight glow. */
function MissionCard({ dest, index, tilt }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    // Gentle tilt only — spotlight overlay removed for a calmer hover.
    const rx = (0.5 - py) * 4;
    const ry = (px - 0.5) * 5;
    ref.current.style.setProperty('--rx', `${rx}deg`);
    ref.current.style.setProperty('--ry', `${ry}deg`);
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
  };

  return (
    <a
      ref={ref}
      href={dest.link}
      target="_blank"
      rel="noreferrer"
      className="mission-card"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <span className="mission-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="mission-thumb">
        <img src={dest.image} alt={`${dest.title} preview`} loading="lazy" />
        <span className="mission-thumb-glow" aria-hidden="true" />
      </div>
      <div className="mission-body">
        <h4>{dest.title}</h4>
        <p className="mission-meta">{dest.meta}</p>
        <p className="mission-summary">{dest.summary}</p>
        <span className="mission-open">
          View project <span aria-hidden="true">↗</span>
        </span>
      </div>
    </a>
  );
}

/* Mission Log / Star Charts — projects grouped into expedition clusters. */
function Missions() {
  const reduced = useReducedMotion();

  return (
    <section id="missions" className="section missions">
      <div className="shell">
        <div className="section-head">
          <p className="section-label" data-reveal>
            <span className="label-glyph">✦</span> {missions.label}
          </p>
          <h2 className="section-heading" data-reveal>
            {missions.heading}
          </h2>
          {missions.lead && (
            <p className="lead" data-reveal>
              {missions.lead}
            </p>
          )}
        </div>

        {missions.clusters.map((cluster) => (
          <div key={cluster.cluster} className="cluster">
            <div className="cluster-head" data-reveal>
              <h3>{cluster.cluster}</h3>
              <span className="cluster-note">{cluster.note}</span>
            </div>

            <div className="mission-grid" data-reveal-group>
              {cluster.destinations.map((dest, i) => (
                <MissionCard key={dest.title} dest={dest} index={i} tilt={!reduced} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Missions;
