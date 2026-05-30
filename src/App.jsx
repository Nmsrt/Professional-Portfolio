import { useEffect, useMemo, useRef, useState } from 'react';

import {
  experienceItems,
  techGroups,
  academicProjects,
  personalProjects,
  contactMethods,
  certifications
} from './data/data';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [resumeOpen,     setResumeOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState('home');
  const shellRef = useRef(null);

  const year = useMemo(() => new Date().getFullYear(), []);

  /* ── Service worker + notification registration ── */
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('Notification' in window)) return;
    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        if (Notification.permission === 'default') await Notification.requestPermission();
        const sw = reg.active || reg.installing || reg.waiting;
        const target = sw || (await navigator.serviceWorker.ready).active;
        if (target) target.postMessage('RESCHEDULE');
      } catch (err) {
        console.warn('[SW]', err);
      }
    };
    register();
  }, []);

  /* ── Active section tracker ──
     On mobile the snap scroll container is .site-shell (overflow-y: scroll).
     On desktop it is the html element.
     We listen on both and use IntersectionObserver as the source of truth
     so we never have to measure scroll positions manually.
  ── */
  useEffect(() => {
    const sectionIds = ['home', 'experience', 'tech', 'certifications', 'projects', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Fire when a section covers at least 50% of the viewport
        threshold: 0.5,
        // Use the snap container as root on mobile, viewport on desktop
        root: null,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Scroll-reveal animations ── */
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Body overflow lock when mobile sidebar open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    ['home',          'Home'],
    ['experience',    'Experience'],
    ['tech',          'Tech'],
    ['certifications','Certifications'],
    ['projects',      'Projects'],
    ['contact',       'Contact'],
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
    <div className="site-shell" ref={shellRef}>
      <Navbar
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        NavLinks={NavLinks}
      />

      <main>
        <Hero   resumeOpen={resumeOpen} setResumeOpen={setResumeOpen} />
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
