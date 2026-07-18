# CLAUDE.md — Professional Portfolio

## Project Overview

Personal portfolio for **Neo Monserrat** (Antonio Enrique Monserrat). Space-exploration-themed single-page React app. Sections styled as mission/voyager metaphors — content is real, framing is thematic.

- **Owner:** Neo Monserrat · neo.monserrat@gmail.com
- **GitHub:** [Nmsrt/Professional-Portfolio](https://github.com/Nmsrt/Professional-Portfolio)
- **Stack:** React 18 · Vite · Three.js · GSAP · Custom CSS (no CSS framework)

---

## Architecture

### Entry Points
- `src/main.jsx` — React mount
- `src/App.jsx` — root component; boots Three.js scene + GSAP choreography on mount

### Data Layer (single source of truth)
- `src/data/data.js` — raw factual data: experience, tech, projects, contacts, certifications
- `src/data/content.js` — space-framing layer on top of `data.js`; exports named objects used by all components. **Never alter factual data here — change `data.js` instead.**

### Components (`src/components/`)
| File | Section | Section ID |
|---|---|---|
| `Hero.jsx` | Launch (hero) | `launch` |
| `About.jsx` | Mission Briefing | `briefing` |
| `Systems.jsx` | Ship Systems / Skills | `systems` |
| `Missions.jsx` | Mission Log / Projects | `missions` |
| `Transmit.jsx` | Contact | `transmit` |
| `Navbar.jsx` | Fixed HUD nav | — |
| `Footer.jsx` | Footer | — |

### 3D & Animation
- `src/three/SpaceScene.js` — Three.js full-screen canvas background. Camera travels `setProgress(0..1)` as user scrolls through waypoints: hero planet → ringed planet → asteroids → wormhole → sun.
- `src/animation/choreography.js` — GSAP + ScrollTrigger. Drives camera from scroll, hero launch sequence, section reveals, parallax. Uses `gsap.from()` so natural CSS = visible state (graceful degradation if JS fails).
- `src/hooks/useReducedMotion.js` — respects `prefers-reduced-motion`; scene renders static frame, choreography bails.
- `src/hooks/useActiveSection.js` — tracks scroll position to highlight active nav item.

### Styling
- `src/styles/cosmos.css` — single stylesheet; "Observatory" theme: quiet premium deep-space editorial. Design tokens in `:root`.
- Fonts: `Fraunces` (serif display), `Hanken Grotesk` (body), `Space Mono` (small meta labels only)
- Color tokens: `--bg #06080f` (ink navy), `--accent #d6ad60` (muted gold, single accent), `--text #dfe4ee`, hairline borders via `--line`/`--line-2`
- No glows/LEDs/scanlines — professional restraint; hairlines + soft neutral shadows only
- Max width: `--shell: 1240px`

### Assets
- `public/assets/` — images, icons, PDFs (served at `/assets/...`)
- `public/assets/icons/` — tech stack icons (PNG)
- `public/assets/projects/` — project preview images

---

## Commands

```bash
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

---

## Content & Copy

All user-facing copy is in `src/data/content.js`. To update:
- **Personal info / experience / tech / projects / contacts:** edit `src/data/data.js`
- **Space-framing labels / headings:** edit `src/data/content.js`

Section → content object mapping:
| Section | Export |
|---|---|
| Hero | `profile` |
| About | `about` |
| Nav | `navItems` |
| Experience | `flightLog` |
| Skills | `systems` |
| Projects | `missions` |
| Contact | `transmission` |
| Footer | `footer` |

---

## Owner Profile (for context)

- **Name:** Antonio Enrique Monserrat ("Neo")
- **Role:** BS Computer Science · Software Technology student at De La Salle University (Manila, PH)
- **Experience:** Completed internship at VRXE (Quezon City, PH, 2026) — VR/tech projects
- **Thesis:** Educational XR software for musical improvisation (Unity, DLSU HXIL lab, 2024–2026)
- **Skills:** C, C++, C#, Python, JavaScript, SQL · React, Node.js, .NET · Git, Figma, Android Studio, Meta Quest SDK, Unity
- **Certs:** QE360 Agile Testing (Oct 2025)

---

## Design Conventions

- Space-exploration metaphor throughout: sections = waypoints, skills = ship systems, projects = missions, contact = transmission
- Dark theme only (`--bg: #05060f`)
- No CSS framework — all custom in `cosmos.css`
- Animations use `gsap.from()` (visible-by-default pattern)
- Three.js scene is purely decorative (`aria-hidden="true"`)
- Quality tiers: Three.js auto-detects device capability and scales particle counts / pixel ratio
