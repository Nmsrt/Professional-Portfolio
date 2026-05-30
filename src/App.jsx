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
import Hero from './components/Hero';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [resumeOpen,    setResumeOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const year = useMemo(() => new Date().getFullYear(), []);

  /* ── Service worker + notifications ── */
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

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = ['home','experience','tech','certifications','projects','contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5, root: null }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Scroll-reveal ── */
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Body lock when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <Navbar
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
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
