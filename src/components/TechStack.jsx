import { techGroups } from '../data/data';

function TechStack() {
  return (
    <section id="tech" className="section">
          <div className="wide-shell">
            <div className="section-header section-header-split">
              <div>
                <span className="eyebrow">Tools</span>
                <h2>Tech stack</h2>
              </div>
            </div>

            <div className="tech-layout">
              {techGroups.map((group) => (
                <section className="tech-panel" key={group.title}>
                  <div className="tech-panel-head">
                    <h3>{group.title}</h3>
                  </div>

                  <div className="tech-clean-grid">
                    {group.items.map((item) => (
                      <article className="tech-clean-card" key={item.name}>
                        <div className="tech-clean-icon-wrap">
                          <img src={item.icon} alt={item.name} className="tech-clean-icon" />
                        </div>
                        <span className="tech-clean-name">{item.name}</span>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
  );
}

export default TechStack;