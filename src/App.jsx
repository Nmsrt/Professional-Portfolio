import { useEffect, useMemo, useState } from 'react';

import {
  experienceItems,
  techGroups,
  academicProjects,
  personalProjects,
  contactMethods,
  certifications
} from './data/data';

import Navbar from './components/Navbar';
import useNotifications from './hooks/useNotifications';
import Hero from './components/Hero';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  useNotifications();

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const sectionIds = [
      'home',
      'experience',
      'tech',
      'certifications',
      'projects',
      'contact'
    ];

    const onScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (bottom) {
        setActiveSection('contact');
        return;
      }

      const y = window.scrollY + 180;
      let current = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);

        if (el && y >= el.offsetTop) {
          current = id;
        }
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
    const animatedEls = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    animatedEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
    ['certifications', 'Certifications'],
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
      <Navbar activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        NavLinks={NavLinks}
      />

      <main>
        <Hero resumeOpen={resumeOpen} setResumeOpen={setResumeOpen} />
        <Experience />
        <TechStack />
        <Certifications />
        <Projects />
        <Contact resumeOpen={resumeOpen} setResumeOpen={setResumeOpen} />
      </main>

      <Footer year={year} />
    </div>
  );
}