/* =============================================================================
 * content.js — single source of truth for all site copy.
 *
 * The raw factual data (experience, tech, projects, certs, contacts) is reused
 * verbatim from data.js. This module layers the space-exploration framing on
 * top (callsigns, section labels, mission framing) WITHOUT altering any factual
 * info — names, links, dates and summaries stay accurate.
 * ===========================================================================*/

import {
  experienceItems,
  techGroups,
  academicProjects,
  personalProjects,
  contactMethods,
  certifications
} from './data';

/* ── Pilot / identity ────────────────────────────────────────────────────── */
export const profile = {
  name: 'Neo Monserrat',
  fullName: 'Antonio Enrique Monserrat',
  callsign: 'CMDR · NEO',
  role: 'Computer Science Student & Software Engineer',
  discipline: 'BS Computer Science · Software Technology',
  affiliation: 'De La Salle University',
  tagline: 'Building thoughtful software across XR, web, and intelligent systems.',
  // Coordinates are decorative HUD flavor (Manila, PH) — not used for anything real.
  coordinates: '14.5995° N · 120.9842° E',
  brand: '/assets/Brand.png',
  portrait: '/assets/profile-illustration.png',
  avatar: '/assets/profile.png',
  resumes: [
    { label: 'ATS Manifest', href: '/assets/AntonioMonserrat_CV_ATS.pdf' },
    { label: 'Designed Manifest', href: '/assets/AntonioMonserrat_CV_Designed.pdf' }
  ]
};

/* ── Mission briefing (About) ────────────────────────────────────────────────
 * Space-themed phrasing wrapped around accurate facts pulled from the bio +
 * experience data: CS student at DLSU, VRXE internship, DrumXRoll XR thesis,
 * and a build history spanning web, desktop, and machine learning.            */
export const about = {
  label: 'Mission Briefing',
  heading: 'Charting a course through software',
  lead:
    "I'm Neo — a Computer Science student at De La Salle University specializing in Software Technology, currently logging flight hours as an intern at VRXE.",
  paragraphs: [
    'My work spans extended reality, web platforms, and machine learning. I care about software that is thoughtful, well-built, and genuinely useful — from immersive XR experiences down to the reliability of the systems underneath.',
    "I'm currently piloting DrumXRoll, my undergraduate thesis: an XR drum-learning system built on Unity and Meta Quest that explores piano-roll visualizations for teaching drum improvisation."
  ],
  stats: [
    { value: '5+', label: 'Years building' },
    { value: 'XR', label: 'Thesis domain' },
    { value: '11', label: 'Logged missions' }
  ]
};

/* ── Navigation (each section = a waypoint) ──────────────────────────────── */
export const navItems = [
  { id: 'launch',    label: 'Launch',     glyph: '◐' },
  { id: 'briefing',  label: 'Briefing',   glyph: '◇' },
  { id: 'systems',   label: 'Systems',    glyph: '⬡' },
  { id: 'missions',  label: 'Missions',   glyph: '✦' },
  { id: 'transmit',  label: 'Transmit',   glyph: '◈' }
];

/* ── Flight log (Experience) ─────────────────────────────────────────────── */
export const flightLog = {
  label: 'Flight Log',
  heading: 'Trajectory so far',
  entries: experienceItems
};

/* ── Ship systems (Skills) ───────────────────────────────────────────────── */
export const systems = {
  label: 'Systems & Capabilities',
  heading: 'Onboard systems',
  lead: 'Core modules powering every mission — calibrated, tested, flight-ready.',
  // Reframe each tech group as a ship subsystem while keeping the real tools.
  modules: [
    { code: 'CORE-01', system: 'Propulsion Core', group: techGroups[0] }, // Programming
    { code: 'NAV-02',  system: 'Navigation Array', group: techGroups[1] }  // Tools & Platforms
  ],
  certifications // shown as "clearances"
};

/* ── Star charts (Projects) ──────────────────────────────────────────────── */
export const missions = {
  label: 'Mission Log',
  heading: 'Star charts & destinations',
  lead: 'Each project is a logged expedition — coordinates lead to live repos and demos.',
  clusters: [
    {
      cluster: 'Deep-Space Missions',
      note: 'Academic & research expeditions',
      destinations: academicProjects
    },
    {
      cluster: 'Solo Expeditions',
      note: 'Personal builds & experiments',
      destinations: personalProjects
    }
  ]
};

/* ── Transmission (Contact) ──────────────────────────────────────────────── */
export const transmission = {
  label: 'Open Channel',
  heading: 'Send a transmission',
  lead: 'Open to opportunities, collaborations, or just a good conversation. Signal is open.',
  channels: contactMethods,
  primaryEmail: 'neo.monserrat@gmail.com'
};

/* ── Footer ──────────────────────────────────────────────────────────────── */
export const footer = {
  sign: 'Transmission ends.',
  meta: 'BS Computer Science · Software Technology'
};
