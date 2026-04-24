import { useEffect, useMemo, useState } from 'react';

const experienceItems = [
  {
    year: '2026',
    title: 'Incoming Software Engineering Intern',
    company: 'VRXE',
    location: 'Philippines',
    text:
      'Preparing to begin my internship and looking forward to contributing to real-world engineering work, learning team workflows, and growing through hands-on experience.'
  },
  {
    year: '2024–2026',
    title: 'DrumXRoll Thesis Project',
    company: 'De La Salle University · HXIL',
    location: 'Manila, Philippines',
    text:
      'Developing an XR drum learning system that explores piano-roll visualizations for teaching drum improvisation using Unity, Meta Quest, and a physical e-drum setup.'
  },
  {
    year: '2021–Present',
    title: 'Software and ML Project Work',
    company: 'Coursework / Personal Builds',
    location: 'Academic / Personal',
    text:
      'Built systems and experiments across web development, desktop apps, and machine learning, with a focus on practical implementation and continuous improvement.'
  }
];

const techGroups = [
  {
    title: 'Programming',
    items: [
      { name: 'C', icon: '/assets/icons/c.png' },
      { name: 'C++', icon: '/assets/icons/cpp.png' },
      { name: 'C#', icon: '/assets/icons/csharp.png' },
      { name: 'Python', icon: '/assets/icons/python.png' },
      { name: 'JavaScript', icon: '/assets/icons/javascript.png' }
    ]
  },
  {
    title: 'Tools & Platforms',
    items: [
      { name: 'Git', icon: '/assets/icons/git.png' },
      { name: 'VS Code', icon: '/assets/icons/vscode.png' },
      { name: 'Android Studio', icon: '/assets/icons/androidstudio.png' },
      { name: 'Meta Quest SDK', icon: '/assets/icons/metaquest.png' },
      { name: 'Figma', icon: '/assets/icons/figma.png' }
    ]
  }
];

const academicProjects = [
  {
    title: 'DrumXRoll',
    meta: 'XR · Unity · Meta Quest',
    summary:
      'An XR drumming trainer with a 3D piano-roll guide and real-time visual feedback for improvisation practice.',
    link: 'https://github.com/NeoMonserrat/DrumXRoll',
    image: '/assets/projects/DrumXRoll Preview.png'
  },
  {
    title: 'Household Poverty Status Classification in NCR Using FIES 2012',
    meta: 'Python · scikit-learn · Jupyter Notebook',
    summary:
      'Machine learning project for classifying poverty status of households in the National Capital Region using FIES 2012.',
    link: 'https://github.com/NeoMonserrat/Household-Poverty-Status-Classification-in-the-National-Capital-Region-Using-FIES-2012',
    image: '/assets/projects/FIES Preview.png'
  },
  {
    title: 'Beneficiary Record Management System',
    meta: 'HTML · CSS · JavaScript',
    summary:
      'Responsive CRUD system with authentication to manage beneficiary records and streamline workflow.',
    link: 'https://github.com/NeoMonserrat/LPPWDFI',
    image: '/assets/projects/LPPWDFI Preview.png'
  },
 {
    title: 'Distributed Data Warehouse Reporting with OLAP',
    meta: 'SQL · Node.js · OLAP',
    summary:
      'Built a distributed data warehouse system across three servers using SQL and OLAP for analytical reporting.',
    link: 'https://github.com/NeoMonserrat/Distributed-Data-Warehouse-Reporting-with-OLAP',
    image: '/assets/projects/OLAP Preview.png'
  },
  {
  title: 'Distributed OCR System (TCP-Based)',
  meta: 'C++ · Qt · TCP Sockets · Multithreading · Tesseract',
  summary:
    'Built a distributed OCR system using raw TCP sockets, enabling asynchronous image processing with a multithreaded server and real-time result streaming.',
  link: 'https://github.com/NeoMonserrat/Distributed-AI-System',
  image: '/assets/projects/Distributed-AI-System Preview.png'
},
];


const personalProjects = [
  {
    title: 'Personal Portfolio Website',
    meta: 'HTML · CSS · JavaScript',
    summary:
      'Minimal portfolio website used to showcase my background, projects, and contact information.',
    link: 'https://github.com/Nmsrt/Professional-Portfolio',
    image: '/assets/projects/Personal-Website Preview.png'
  },
  {
    title: 'POS Desktop App',
    meta: 'Python · Tkinter · SQLite',
    summary:
      'Cashier app with stock tracking, receipt history, transaction logs, and admin-protected management features.',
    link: 'https://github.com/Nmsrt/ALN_Auto_Supply_POS_App',
    image: '/assets/projects/POS Preview.png'
  },
  {
    title: 'Collaborative Remote Band Cover Production Manager',
    meta: 'React · Express · SQLite',
    summary:
      'Remote band cover workflow app for tracking roles, stems, video takes, mix drafts, reference tracks, song sections, members, and feedback.',
    link: 'https://github.com/Nmsrt/Real-Time-Collaborative-Remote-Band-Cover-Production-Manage',
    image: '/assets/projects/CoverFlow Preview.png'
  },
  {
    title: 'More projects coming soon',
    meta: '... · ... · ...',
    summary:
      '...',
    link: '#projects',
    image: '/assets/projects/coming-soon.png'
  }
];

const contactMethods = [
  { label: 'Phone', value: '+63 927 664 6821', href: 'tel:+639276646821' },
  { label: 'Email', value: 'neo.monserrat@gmail.com', href: 'mailto:neo.monserrat@gmail.com' },
  {
    label: 'LinkedIn',
    value: 'antonio-enrique-monserrat',
    href: 'https://www.linkedin.com/in/antonio-enrique-monserrat-232ab6328'
  },
  { label: 'GitHub', value: '@NeoMonserrat', href: 'https://github.com/NeoMonserrat' }
];

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/neo.msrt/' },
  { name: 'Facebook', href: 'https://www.facebook.com/neo.monserrat' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@neomessi1001' },
  { name: 'Discord', href: 'https://discordapp.com/users/700708612447666216' }
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const sectionIds = ['home', 'experience', 'tech', 'projects', 'contact'];

    const onScroll = () => {
      const y = window.scrollY + 180;
      let current = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) current = id;
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    ['home', 'Home'],
    ['experience', 'Experience'],
    ['tech', 'Tech'],
    ['projects', 'Projects'],
    ['contact', 'Contact']
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${mobile ? 'mobile-link' : 'topbar-link'} ${activeSection === id ? 'is-active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          {label}
        </a>
      ))}
    </>
  );

  return (
    <div className="site-shell">
      <header className="topbar-shell">
        <div className="topbar">
          <a href="#home" className="brand" aria-label="Neo Monserrat home">
            <div className="brand-avatar">
              <img src="/assets/Brand.png" alt="Neo" />
            </div>
            <div className="brand-text">
              <strong>Neo</strong>
              <span>Portfolio</span>
            </div>
          </a>

          <nav className="topbar-nav" aria-label="Primary navigation">
            <NavLinks />
          </nav>

          <div className="topbar-right">
            <a className="topbar-cta" href="#contact">
              Let&apos;s Talk
            </a>
            <button
              type="button"
              className="menu-button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-overlay ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`mobile-sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile menu">
        <div className="mobile-head">
          <div className="brand-avatar">N</div>
          <button type="button" className="close-button" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="mobile-nav">
          <NavLinks mobile />
        </nav>
        <a className="mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>
          Let&apos;s Talk
        </a>
      </aside>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-frame">
            <div className="hero-noise" aria-hidden="true" />
            <div className="hero-grid-overlay" aria-hidden="true" />
            <div className="hero-spotlight" aria-hidden="true" />
            <div className="hero-orb hero-orb-1" aria-hidden="true" />
            <div className="hero-orb hero-orb-2" aria-hidden="true" />

            <div className="hero-grid wide-shell">
              <div className="hero-copy hero-copy-left">
                <div className="hero-chip-row">
                  <span className="hero-chip">Portfolio</span>
                </div>

                <h1 className="hero-title hero-title-main">
                  Hello World<span className="hero-accent">!</span>
                </h1>

                <h2 className="hero-title hero-title-sub">I&apos;m Neo</h2>

                <p className="hero-role">
                  BS Computer Science Student passionate about software development and building thoughtful,
                  impactful projects.
                </p>

                <div className="hero-actions hero-actions-acid">
                  <a href="/assets/AntonioMonserrat_CV.pdf" download className="btn btn-accent btn-lg">
                    <span>↓</span>
                    Download Resume
                  </a>

                  <a href="#projects" className="btn btn-ghost-accent btn-lg">
                    View Projects
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-visual-ring hero-visual-ring-1" aria-hidden="true" />
                <div className="hero-visual-ring hero-visual-ring-2" aria-hidden="true" />

                <div className="hero-portrait-card">
                  <img src="/assets/profile-illustration.png" alt="Neo portrait" className="hero-portrait-image" />
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="wide-shell">
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

        <section id="projects" className="section">
          <div className="wide-shell">
            <div className="section-header section-header-split">
              <div>
                <span className="eyebrow">Portfolio</span>
                <h2>Projects</h2>
              </div>
            </div>

            <article id="featured" className="featured-card">
              <div className="featured-media">
                <img src="/assets/DrumXRoll Logo.png" alt="DrumXRoll project banner" />
              </div>

              <div className="featured-content">
                <div className="badge-row">
                  <span className="badge">THESIS · 2024–2026</span>
                  <span className="badge badge-soft">XR · HXIL · Unity</span>
                </div>
                <h3>DrumXRoll: Exploring XR Piano Roll in Teaching Drum Improvisation</h3>
                <p>
                  An XR drumming trainer with a 3D piano-roll guide and real-time visual feedback designed to improve
                  improvisation practice, timing, and engagement.
                </p>
                <div className="action-row">
                  <a className="btn btn-primary" href="https://github.com/NeoMonserrat/DrumXRoll">
                    View Project
                  </a>
                  <a className="btn btn-secondary" href="https://drive.google.com/file/d/1pkJPmJvR6s6iNmPX9SRxbzJMfDvcBS0d/view?usp=sharing">
                    Watch demo
                  </a>
                  <a className="btn btn-secondary" href="https://drive.google.com/file/d/1nuJ8-bDYmKXGdXGlJn9ZomzhMH-TevM5/view?usp=sharing">
                    Read paper
                  </a>
                </div>
              </div>
            </article>

            <div className="project-columns">
              <div>
                <div className="column-head">
                  <h3>Academic Projects</h3>
                  <span>{academicProjects.length}</span>
                </div>
                <div className="project-stack">
                  {academicProjects.map((project) => (
                    <a className="card project-card project-card-media" key={project.title} href={project.link}>
                      <div className="project-card-image-wrap">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="project-card-image"
                        />
                      </div>

                      <div className="project-card-body">
                        <h4>{project.title}</h4>
                        <p className="project-meta">{project.meta}</p>
                        <p>{project.summary}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="column-head">
                  <h3>Personal Projects</h3>
                  <span>{personalProjects.length}</span>
                </div>
                <div className="project-stack">
                  {personalProjects.map((project) => (
                    <a className="card project-card project-card-media" key={project.title} href={project.link}>
                      <div className="project-card-image-wrap">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="project-card-image"
                        />
                      </div>

                      <div className="project-card-body">
                        <h4>{project.title}</h4>
                        <p className="project-meta">{project.meta}</p>
                        <p>{project.summary}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

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
      </main>

      <footer className="site-footer">
        <div className="wide-shell footer-inner">
          <div>
            <div className="footer-name">Neo Monserrat</div>
            <div className="footer-meta">BS Computer Science - Major in Software Technology</div>
          </div>

          <div className="footer-links">
            <a href="tel:+639276646821">Phone</a>
            <a href="mailto:neo.monserrat@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/antonio-enrique-monserrat" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/NeoMonserrat" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

          <div className="footer-copy">© {year}</div>
        </div>
      </footer>
    </div>
  );
}
