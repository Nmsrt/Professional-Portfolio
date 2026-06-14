/* =============================================================================
 * SpaceScene.js — the cinematic deep-space background.
 *
 * One fixed full-screen canvas sits behind all content. As the page scrolls,
 * `setProgress(0..1)` flies the camera down a corridor of celestial waypoints:
 *
 *   progress  0.0 ───────────────────────────────────────────► 1.0
 *   waypoint  hero planet · ringed planet · asteroids · wormhole · sun
 *
 * Performance:
 *   · particle counts + pixel ratio scale with a detected quality tier
 *   · asteroids use InstancedMesh; low tier drops the heaviest effects
 *   · loop pauses when the tab is hidden
 *   · prefers-reduced-motion renders a single static, composed frame
 *
 * Tweak knobs live in CONFIG / WAYPOINTS / PALETTE below.
 * ===========================================================================*/

import * as THREE from 'three';

/* Cosmic palette — deep navy base, electric + warm accents (distant suns). */
const PALETTE = {
  bg:       0x05060f,
  blue:     0x2f6bff,
  electric: 0x38bdf8,
  cyan:     0x22d3ee,
  violet:   0x8b5cf6,
  gold:     0xf5a524,
  warm:     0xff7a33,
  white:    0xe9f1ff
};

/* Camera corridor — z positions the camera dollies between. */
const CONFIG = {
  startZ: 14,
  endZ: -232,
  introDistance: 80,   // extra pull-back during the launch sequence
  far: 620
};

/* Focal anchors placed along the corridor (one per major section). */
const WAYPOINTS = {
  heroPlanet:  { x: 19,  y: -3, z: -22 },
  ringPlanet:  { x: -22, y: 5,  z: -74 },
  asteroids:   { x: 0,   y: 0,  z: -120 },
  wormhole:    { x: 4,   y: -1, z: -168 },
  sun:         { x: 0,   y: 2,  z: -214 }
};

/* ── Texture factories (procedural — no image assets needed) ──────────────── */

function makeSoftSprite(stops) {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([offset, color]) => g.addColorStop(offset, color));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// Round, soft star sprite.
function makeStarTexture() {
  return makeSoftSprite([
    [0, 'rgba(255,255,255,1)'],
    [0.25, 'rgba(255,255,255,0.85)'],
    [0.5, 'rgba(180,210,255,0.35)'],
    [1, 'rgba(255,255,255,0)']
  ]);
}

// Coloured radial glow used for atmospheres, nebula clouds and the sun's corona.
function makeGlowTexture(hex) {
  const col = new THREE.Color(hex);
  const rgb = `${(col.r * 255) | 0},${(col.g * 255) | 0},${(col.b * 255) | 0}`;
  return makeSoftSprite([
    [0, `rgba(${rgb},0.9)`],
    [0.4, `rgba(${rgb},0.35)`],
    [0.7, `rgba(${rgb},0.08)`],
    [1, `rgba(${rgb},0)`]
  ]);
}

// Banded, lightly-noised planet surface drawn to an equirectangular canvas.
function makePlanetTexture({ base, band, accent }) {
  const w = 512;
  const h = 256;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');

  // vertical gradient base
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, base);
  g.addColorStop(0.5, band);
  g.addColorStop(1, base);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // horizontal cloud bands
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 26; i++) {
    const y = Math.random() * h;
    ctx.fillStyle = Math.random() > 0.5 ? accent : band;
    ctx.fillRect(0, y, w, 2 + Math.random() * 8);
  }

  // soft speckle
  ctx.globalAlpha = 0.10;
  for (let i = 0; i < 240; i++) {
    ctx.fillStyle = accent;
    const r = Math.random() * 3;
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ── Quality detection ────────────────────────────────────────────────────── */
export function detectQuality() {
  if (typeof window === 'undefined') return 'high';
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 820;
  const fewCores = (navigator.hardwareConcurrency || 8) <= 4;
  const lowMem = (navigator.deviceMemory || 8) <= 4;
  return narrow || coarse || fewCores || lowMem ? 'low' : 'high';
}

/* ============================================================================ */
export default class SpaceScene {
  constructor(canvas, { reducedMotion = false, quality = 'high' } = {}) {
    this.canvas = canvas;
    this.reducedMotion = reducedMotion;
    this.quality = quality;

    this.progress = 0;        // smoothed scroll progress
    this.targetProgress = 0;  // latest value from ScrollTrigger
    this.intro = 1;           // 1 = pulled back / launch, 0 = settled
    this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    this._disposables = [];
    this._raf = null;
    this._running = false;

    this._initRenderer();
    this._initScene();
    this._buildStarfield();
    this._buildNebula();
    this._buildPlanets();
    this._buildAsteroids();
    this._buildWormhole();
    this._buildSun();

    this._onResize = this._resize.bind(this);
    this._onVisibility = this._handleVisibility.bind(this);
    this._onPointer = this._handlePointer.bind(this);
    window.addEventListener('resize', this._onResize);
    document.addEventListener('visibilitychange', this._onVisibility);
    if (!reducedMotion && quality === 'high') {
      window.addEventListener('pointermove', this._onPointer, { passive: true });
    }

    this._resize();
  }

  /* ── Setup ──────────────────────────────────────────────────────────────── */
  _initRenderer() {
    const cap = this.quality === 'high' ? 2 : 1.5;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: this.quality === 'high',
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
    this.renderer.setClearColor(PALETTE.bg, 1);
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(PALETTE.bg, 0.0016);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      CONFIG.far
    );
    this.camera.position.set(0, 0, CONFIG.startZ);

    this.scene.add(new THREE.AmbientLight(0x33405f, 1.1));

    // cool key light from "above-camera" so planet faces read against the dark
    this.keyLight = new THREE.DirectionalLight(PALETTE.electric, 0.8);
    this.keyLight.position.set(-1, 1, 2);
    this.scene.add(this.keyLight);

    // warm light lives at the sun (added in _buildSun)
  }

  _track(obj) {
    this._disposables.push(obj);
    return obj;
  }

  /* ── Starfield: 3 parallax layers of additive points ──────────────────────── */
  _buildStarfield() {
    const starTex = this._track(makeStarTexture());
    const total = this.quality === 'high' ? 6000 : 1800;
    const zNear = CONFIG.startZ + 40;
    const zFar = CONFIG.endZ - 60;

    const layers = [
      { frac: 0.5,  size: 0.6, spread: 150, tint: [0.7, 0.8, 1.0] },
      { frac: 0.35, size: 1.1, spread: 95,  tint: [1.0, 1.0, 1.0] },
      { frac: 0.15, size: 1.8, spread: 62,  tint: [1.0, 0.92, 0.8] }
    ];

    this.starLayers = layers.map((layer) => {
      const count = Math.floor(total * layer.frac);
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const base = new THREE.Color();

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * layer.spread * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * layer.spread * 2;
        positions[i * 3 + 2] = zNear + Math.random() * (zFar - zNear);

        // mostly white, occasional electric-blue or warm-gold star
        const roll = Math.random();
        if (roll > 0.92) base.setHex(PALETTE.electric);
        else if (roll > 0.85) base.setHex(PALETTE.gold);
        else base.setRGB(layer.tint[0], layer.tint[1], layer.tint[2]);

        const b = 0.6 + Math.random() * 0.4;
        colors[i * 3] = base.r * b;
        colors[i * 3 + 1] = base.g * b;
        colors[i * 3 + 2] = base.b * b;
      }

      const geo = this._track(new THREE.BufferGeometry());
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = this._track(
        new THREE.PointsMaterial({
          size: layer.size,
          map: starTex,
          vertexColors: true,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true
        })
      );

      const points = new THREE.Points(geo, mat);
      points.userData.drift = layer.frac * 0.01; // slow rotation for parallax
      this.scene.add(points);
      return points;
    });

    // Fine cosmic dust drifting near the corridor.
    const dustCount = this.quality === 'high' ? 900 : 300;
    const dPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dPos[i * 3] = (Math.random() - 0.5) * 80;
      dPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      dPos[i * 3 + 2] = zNear + Math.random() * (zFar - zNear);
    }
    const dGeo = this._track(new THREE.BufferGeometry());
    dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    const dMat = this._track(
      new THREE.PointsMaterial({
        size: 0.5,
        map: starTex,
        color: PALETTE.cyan,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    this.dust = new THREE.Points(dGeo, dMat);
    this.scene.add(this.dust);
  }

  /* ── Nebula: a few huge additive glow sprites for atmosphere ──────────────── */
  _buildNebula() {
    const clouds =
      this.quality === 'high'
        ? [
            { hex: PALETTE.violet, pos: [-40, 20, -60], scale: 130, op: 0.5 },
            { hex: PALETTE.blue, pos: [50, -25, -110], scale: 160, op: 0.42 },
            { hex: PALETTE.cyan, pos: [-30, -10, -150], scale: 120, op: 0.32 },
            { hex: PALETTE.warm, pos: [20, 30, -200], scale: 150, op: 0.3 }
          ]
        : [
            { hex: PALETTE.violet, pos: [-30, 15, -70], scale: 120, op: 0.4 },
            { hex: PALETTE.blue, pos: [40, -20, -150], scale: 150, op: 0.32 }
          ];

    this.nebula = new THREE.Group();
    clouds.forEach((c) => {
      const tex = this._track(makeGlowTexture(c.hex));
      const mat = this._track(
        new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: c.op,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      );
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(...c.pos);
      sprite.scale.setScalar(c.scale);
      this.nebula.add(sprite);
    });
    this.scene.add(this.nebula);
  }

  // Helper: planet sphere + atmosphere glow as a positioned group.
  _makePlanet({ radius, texture, glow, atmosphere, position }) {
    const group = new THREE.Group();
    const geo = this._track(new THREE.SphereGeometry(radius, 48, 48));
    const mat = this._track(
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.92,
        metalness: 0.05,
        emissive: new THREE.Color(glow),
        emissiveIntensity: 0.12
      })
    );
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    // atmosphere halo
    const haloTex = this._track(makeGlowTexture(atmosphere));
    const haloMat = this._track(
      new THREE.SpriteMaterial({
        map: haloTex,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(radius * 3.2);
    group.add(halo);

    group.position.set(position.x, position.y, position.z);
    group.userData.spin = mesh;
    return group;
  }

  _buildPlanets() {
    // Hero planet — electric blue gas world.
    this.heroPlanet = this._makePlanet({
      radius: 7,
      texture: this._track(
        makePlanetTexture({ base: '#0b2a52', band: '#1d5fb0', accent: '#7fd4ff' })
      ),
      glow: PALETTE.electric,
      atmosphere: PALETTE.cyan,
      position: WAYPOINTS.heroPlanet
    });
    this.scene.add(this.heroPlanet);

    // Briefing planet — violet/gold ringed world (Saturn-like).
    this.ringPlanet = this._makePlanet({
      radius: 9,
      texture: this._track(
        makePlanetTexture({ base: '#2a1450', band: '#6b3fa0', accent: '#f5c97a' })
      ),
      glow: PALETTE.violet,
      atmosphere: PALETTE.violet,
      position: WAYPOINTS.ringPlanet
    });

    // ring
    const ringGeo = this._track(new THREE.RingGeometry(11.5, 17, 96));
    const ringMat = this._track(
      new THREE.MeshBasicMaterial({
        color: PALETTE.gold,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -1.15;
    ring.rotation.y = 0.2;
    this.ringPlanet.add(ring);

    // a small moon
    const moonGeo = this._track(new THREE.SphereGeometry(1.4, 24, 24));
    const moonMat = this._track(
      new THREE.MeshStandardMaterial({ color: 0xbfc6d8, roughness: 1, metalness: 0 })
    );
    this.moon = new THREE.Mesh(moonGeo, moonMat);
    this.ringPlanet.add(this.moon);

    this.scene.add(this.ringPlanet);
  }

  /* ── Asteroid field: InstancedMesh (skipped on low tier) ──────────────────── */
  _buildAsteroids() {
    if (this.quality !== 'high') {
      this.asteroids = null;
      return;
    }
    const count = 130;
    const geo = this._track(new THREE.IcosahedronGeometry(0.65, 0));
    const mat = this._track(
      new THREE.MeshStandardMaterial({ color: 0x6b748c, roughness: 1, metalness: 0.1, flatShading: true })
    );
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();
    const { x: cx, y: cy, z: cz } = WAYPOINTS.asteroids;

    for (let i = 0; i < count; i++) {
      dummy.position.set(
        cx + (Math.random() - 0.5) * 70,
        cy + (Math.random() - 0.5) * 44,
        cz + (Math.random() - 0.5) * 60
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.setScalar(0.4 + Math.random() * 1.8);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    this.asteroids = mesh;
    this.scene.add(mesh);
  }

  /* ── Wormhole: stacked additive torus rings forming a spiral tunnel ───────── */
  _buildWormhole() {
    this.wormhole = new THREE.Group();
    const ringCount = this.quality === 'high' ? 16 : 9;
    const startZ = WAYPOINTS.wormhole.z + 18;
    const endZ = WAYPOINTS.wormhole.z - 22;
    const colorA = new THREE.Color(PALETTE.cyan);
    const colorB = new THREE.Color(PALETTE.violet);
    this.wormRings = [];

    for (let i = 0; i < ringCount; i++) {
      const t = i / (ringCount - 1);
      const radius = 5 + Math.sin(t * Math.PI) * 4;
      const geo = this._track(new THREE.TorusGeometry(radius, 0.18, 8, 60));
      const mat = this._track(
        new THREE.MeshBasicMaterial({
          color: colorA.clone().lerp(colorB, t),
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      const ring = new THREE.Mesh(geo, mat);
      ring.position.set(WAYPOINTS.wormhole.x, WAYPOINTS.wormhole.y, startZ + (endZ - startZ) * t);
      ring.rotation.z = t * Math.PI;
      ring.userData.spin = (i % 2 === 0 ? 1 : -1) * (0.2 + t * 0.4);
      this.wormhole.add(ring);
      this.wormRings.push(ring);
    }

    // portal core glow
    const coreTex = this._track(makeGlowTexture(PALETTE.electric));
    const coreMat = this._track(
      new THREE.SpriteMaterial({
        map: coreTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    this.portalCore = new THREE.Sprite(coreMat);
    this.portalCore.position.set(WAYPOINTS.wormhole.x, WAYPOINTS.wormhole.y, endZ - 4);
    this.portalCore.scale.setScalar(18);
    this.wormhole.add(this.portalCore);

    this.scene.add(this.wormhole);
  }

  /* ── Sun: emissive core + corona glow + warm point light ──────────────────── */
  _buildSun() {
    const { x, y, z } = WAYPOINTS.sun;
    const geo = this._track(new THREE.IcosahedronGeometry(10, 3));
    const mat = this._track(
      new THREE.MeshBasicMaterial({ color: PALETTE.warm })
    );
    this.sun = new THREE.Mesh(geo, mat);
    this.sun.position.set(x, y, z);
    this.scene.add(this.sun);

    const coronaTex = this._track(makeGlowTexture(PALETTE.gold));
    const coronaMat = this._track(
      new THREE.SpriteMaterial({
        map: coronaTex,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    this.corona = new THREE.Sprite(coronaMat);
    this.corona.position.set(x, y, z);
    this.corona.scale.setScalar(70);
    this.scene.add(this.corona);

    this.sunLight = new THREE.PointLight(PALETTE.warm, 2.2, 400, 1.4);
    this.sunLight.position.set(x, y, z + 10);
    this.scene.add(this.sunLight);
  }

  /* ── Public API ───────────────────────────────────────────────────────────── */

  // 0..1 scroll progress from ScrollTrigger.
  setProgress(p) {
    this.targetProgress = Math.max(0, Math.min(1, p));
  }

  // Launch sequence: 1 (far / dim) → 0 (settled). Driven by GSAP on load.
  setIntro(v) {
    this.intro = Math.max(0, Math.min(1, v));
  }

  start() {
    if (this.reducedMotion) {
      // Single composed static frame — no loop, no parallax.
      this.intro = 0;
      this.progress = this.targetProgress = 0;
      this._updateStatic();
      this._render();
      return;
    }
    if (this._running) return;
    this._running = true;
    this.clock = new THREE.Clock();
    this._loop();
  }

  /* ── Internals ────────────────────────────────────────────────────────────── */
  _handlePointer(e) {
    this.mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  _handleVisibility() {
    if (document.hidden) {
      this._running = false;
      if (this._raf) cancelAnimationFrame(this._raf);
    } else if (!this.reducedMotion && !this._running) {
      this._running = true;
      this.clock.start();
      this._loop();
    }
  }

  _loop() {
    if (!this._running) return;
    this._raf = requestAnimationFrame(() => this._loop());
    this._updateAnimated(this.clock.getElapsedTime());
    this._render();
  }

  // Position camera for reduced-motion (static, no sway).
  _updateStatic() {
    const camZ = THREE.MathUtils.lerp(CONFIG.startZ, CONFIG.endZ, 0.02);
    this.camera.position.set(0, 1, camZ);
    this.camera.lookAt(0, 0, camZ - 40);
  }

  _updateAnimated(t) {
    // Smooth scroll + intro toward their targets.
    this.progress += (this.targetProgress - this.progress) * 0.06;
    this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.05;

    // Camera dolly along corridor + banking sway + intro pull-back.
    const camZ = THREE.MathUtils.lerp(CONFIG.startZ, CONFIG.endZ, this.progress);
    const swayX = Math.sin(this.progress * Math.PI * 3) * 7 + Math.sin(t * 0.3) * 0.6;
    const swayY = Math.cos(this.progress * Math.PI * 2) * 4 + 2 + Math.cos(t * 0.25) * 0.5;
    const introZ = this.intro * CONFIG.introDistance;

    this.camera.position.set(
      swayX + this.mouse.x * 3,
      swayY + this.mouse.y * 2,
      camZ + introZ
    );
    this.camera.lookAt(swayX * 0.4, swayY * 0.4, camZ - 40);

    // Starfield slow rotation (parallax) + dust drift.
    this.starLayers.forEach((layer) => {
      layer.rotation.z += layer.userData.drift * 0.02;
    });
    if (this.dust) {
      this.dust.rotation.y = t * 0.01;
      this.dust.rotation.x = Math.sin(t * 0.05) * 0.1;
    }

    // Nebula breathing.
    this.nebula.rotation.z = t * 0.005;

    // Planet rotation.
    this.heroPlanet.userData.spin.rotation.y = t * 0.08;
    this.ringPlanet.userData.spin.rotation.y = t * 0.05;
    // moon orbit
    const mo = t * 0.4;
    this.moon.position.set(Math.cos(mo) * 14, Math.sin(mo) * 4, Math.sin(mo) * 14);

    // Asteroid field slow tumble.
    if (this.asteroids) {
      this.asteroids.rotation.y = t * 0.03;
      this.asteroids.rotation.x = Math.sin(t * 0.04) * 0.15;
    }

    // Wormhole spin + portal pulse.
    this.wormRings.forEach((ring) => {
      ring.rotation.z += ring.userData.spin * 0.01;
    });
    const pulse = 0.8 + Math.sin(t * 2) * 0.15;
    this.portalCore.scale.setScalar(18 * pulse);

    // Sun flicker + corona breathing.
    const sunPulse = 1 + Math.sin(t * 1.5) * 0.04;
    this.sun.scale.setScalar(sunPulse);
    this.corona.scale.setScalar(70 * (1 + Math.sin(t * 0.8) * 0.06));
    this.sun.rotation.y = t * 0.05;
  }

  _render() {
    this.renderer.render(this.scene, this.camera);
  }

  _resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    if (this.reducedMotion) {
      this._updateStatic();
      this._render();
    }
  }

  dispose() {
    this._running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('visibilitychange', this._onVisibility);
    window.removeEventListener('pointermove', this._onPointer);

    this._disposables.forEach((obj) => {
      if (obj.dispose) obj.dispose();
    });
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose?.();
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => {
          m.map?.dispose?.();
          m.dispose?.();
        });
      }
    });
    this.renderer.dispose();
    this.renderer.forceContextLoss?.();
  }
}
