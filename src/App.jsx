import { useEffect, useMemo, useRef } from 'react';

import SpaceScene, { detectQuality } from './three/SpaceScene';
import { initChoreography } from './animation/choreography';
import useReducedMotion from './hooks/useReducedMotion';
import useActiveSection from './hooks/useActiveSection';
import { navItems } from './data/content';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About, { Experience } from './components/About';
import Systems from './components/Systems';
import Missions from './components/Missions';
import Transmit from './components/Transmit';
import Footer from './components/Footer';

export default function App() {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const year = useMemo(() => new Date().getFullYear(), []);
  const activeId = useActiveSection(navItems.map((n) => n.id));

  /* Boot the Three.js scene + GSAP choreography once mounted. */
  useEffect(() => {
    if (!canvasRef.current || !rootRef.current) return undefined;

    const scene = new SpaceScene(canvasRef.current, {
      reducedMotion,
      quality: detectQuality()
    });
    scene.start();

    const cleanupChoreo = initChoreography({
      scene,
      root: rootRef.current,
      reducedMotion
    });

    return () => {
      cleanupChoreo();
      scene.dispose();
    };
  }, [reducedMotion]);

  /* Deep links: the browser can't jump to #hash anchors that don't exist until
     React mounts, so restore that behavior manually. */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <div className="cosmos" ref={rootRef}>
      {/* Fixed 3D background */}
      <canvas ref={canvasRef} className="space-canvas" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Navbar activeId={activeId} />

      <main>
        <Hero />
        <About />
        <Experience />
        <Systems />
        <Missions />
        <Transmit />
      </main>

      <Footer year={year} />
    </div>
  );
}
