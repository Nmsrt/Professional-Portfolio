import { useEffect, useMemo, useState } from 'react';

import {
  experienceItems,
  techGroups,
  academicProjects,
  personalProjects,
  contactMethods,
  socials
} from './data/data';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        NavLinks={NavLinks}
      />

      <main>
        <Hero />
        <Experience />
        <TechStack />
        <Projects />
        <Contact />
      </main>

      <Footer year={year} />      
    </div>
  );
}
