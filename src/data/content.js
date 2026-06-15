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
  callsign: 'NEO MONSERRAT',
  role: 'Computer Science Student & Software Engineer',
  discipline: 'BS Computer Science · Software Technology',
  affiliation: 'De La Salle University',
  tagline: 'Building thoughtful software across web, systems, and machine learning.',
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
 * experience data: CS student at DLSU, VRXE internship,
 * and a build history spanning web, desktop, and machine learning.            */
export const about = {
  label: 'About',
  heading: 'About me',
  lead:
    "I'm Neo — a Computer Science student at De La Salle University specializing in Software Technology, currently interning at VRXE.",
  paragraphs: [
    'My work spans web platforms, machine learning, and software systems. I care about software that is thoughtful, well-built, and genuinely useful — from clean interfaces down to the reliability of the systems underneath.',
    'My projects tend to be practical: tools people can actually use, systems that hold up under real conditions.'
  ],
  stats: [
    { value: '2021', label: 'Active since' },
    { value: 'CS', label: 'Discipline' }
  ]
};

/* ── Navigation (each section = a waypoint) ──────────────────────────────── */
export const navItems = [
  { id: 'launch',    label: 'Home',      glyph: '◐' },
  { id: 'briefing',  label: 'About',     glyph: '◇' },
  { id: 'systems',   label: 'Skills',    glyph: '⬡' },
  { id: 'missions',  label: 'Projects',  glyph: '✦' },
  { id: 'transmit',  label: 'Contact',   glyph: '◈' }
];

/* ── Flight log (Experience) ─────────────────────────────────────────────── */
export const flightLog = {
  label: 'Experience',
  heading: 'Experience',
  entries: experienceItems
};

/* ── Ship systems (Skills) ───────────────────────────────────────────────── */
export const systems = {
  label: 'Skills',
  heading: 'Skills & tools',
  lead: '',
  modules: [
    { code: '01', system: 'Languages & Frameworks', group: techGroups[0] }, // Programming
    { code: '02', system: 'Tools & Platforms',      group: techGroups[1] }  // Tools & Platforms
  ],
  certifications
};

/* ── Star charts (Projects) ──────────────────────────────────────────────── */
export const missions = {
  label: 'Projects',
  heading: 'Projects',
  lead: '',
  clusters: [
    {
      cluster: 'Academic & Research',
      note: 'University and research work',
      destinations: academicProjects
    },
    {
      cluster: 'Personal Projects',
      note: 'Personal builds & experiments',
      destinations: personalProjects
    }
  ]
};

/* ── Transmission (Contact) ──────────────────────────────────────────────── */
export const transmission = {
  label: 'Contact',
  heading: 'Get in touch',
  lead: 'Open to opportunities, collaborations, or just a good conversation.',
  channels: contactMethods,
  primaryEmail: 'neo.monserrat@gmail.com'
};

/* ── Footer ──────────────────────────────────────────────────────────────── */
export const footer = {
  sign: 'Thanks for visiting.',
  meta: 'BS Computer Science · Software Technology'
};
