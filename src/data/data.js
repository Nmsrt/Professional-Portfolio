export const experienceItems = [
  {
    year: '2026',
    title: 'Software Development Internship',
    company: 'VRXE',
    location: 'Quezon City, Philippines',
    text:
      'Completed my internship at VRXE, contributing to VR and technology-related projects while gaining hands-on experience in software development, problem-solving, team collaboration, and real-world engineering workflows.'
  },
  {
    year: '2024–2026',
    title: 'Undergraduate Thesis Project',
    company: 'De La Salle University · HXIL',
    location: 'Manila, Philippines',
    text:
      'Developing an educational software system that explores interactive visualizations for teaching musical improvisation, built with Unity and a physical hardware setup.'
  },
  {
    year: '2021–Present',
    title: 'Software Project Work',
    company: 'Coursework / Personal Builds',
    location: 'Academic / Personal',
    text:
      'Built systems and experiments across web development, desktop apps, and machine learning, with a focus on practical implementation and continuous improvement.'
  }
];

export const techGroups = [
  {
    title: 'Programming',
    items: [
      { name: 'C', icon: '/assets/icons/c.png' },
      { name: 'C++', icon: '/assets/icons/cpp.png' },
      { name: 'C#', icon: '/assets/icons/csharp.png' },
      { name: 'Python', icon: '/assets/icons/python.png' },
      { name: 'JavaScript', icon: '/assets/icons/javascript.png' },
      { name: 'SQL', icon: '/assets/icons/sql.png' }
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

export const academicProjects = [
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
    link:
      'https://github.com/NeoMonserrat/Household-Poverty-Status-Classification-in-the-National-Capital-Region-Using-FIES-2012',
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
  }
];

export const personalProjects = [
  {
    title: 'Portfolio Website',
    meta: 'React · HTML · CSS · JavaScript',
    summary:
      'Minimal portfolio website used to showcase my background, projects, and contact information.',
    link: 'https://github.com/Nmsrt/Professional-Portfolio',
    image: '/assets/projects/Personal-Portfolio Preview.png'
  },
  {
    title: 'Neo.Dev',
    meta: 'HTML · CSS · JavaScript',
    summary:
      'Retro/vaporwave personal site with a pixel aesthetic, dark/light mode, shooting-stars canvas, live weather, and pages for gaming, desk setup, instruments, and travel.',
    link: 'https://github.com/Nmsrt/Neo.Web',
    image: '/assets/projects/Neo.Dev Preview.png'
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
    link:
      'https://github.com/Nmsrt/Real-Time-Collaborative-Remote-Band-Cover-Production-Manage',
    image: '/assets/projects/CoverFlow Preview.png'
  },
  {
    title: 'YouTube Audio Downloader',
    meta: 'Node.js · Express · yt-dlp',
    summary: 'A local web app for downloading YouTube audio as MP3 or WAV, with auto-filled filenames, editable save location, light/dark mode, and a clean desktop-style interface.',
    link: 'https://github.com/Nmsrt/Youtube-Audio-Downloader',
    image: '/assets/projects/Youtube Audio Downloader Preview.png'
  },
  {
    title: 'Personal Budget Tracker App',
    meta: 'React · Express · SQLite',
    summary: 'A simple app for tracking personal expenses and managing budgets.',
    link: 'https://github.com/Nmsrt/Personal-Budget-Tracker-App',
    image: '/assets/projects/Personal-Budget-Tracker Preview.png'
  },
  {
    title: 'Roby Portfolio Website',
    meta: 'Next.js · React · TypeScript',
    summary:
      'Personal portfolio website built for a friend, showcasing their background, work, and contact details.',
    image: '/assets/projects/Roby Portfolio Website Preview.png'
  },
  {
    title: 'Company Repair Ticket System',
    meta: 'React · Vite · Tailwind · Supabase · Deno',
    summary:
      'Full-stack repair ticket platform handling the complete job lifecycle (client submission, technician diagnosis, pricing, and payment) with staff dashboards, real-time updates, web push notifications, and offline PWA support.',
    link: 'https://github.com/vrxe0274/company-repair-ticket-system',
    image: '/assets/projects/Company-Repair-Ticket-System Preview.png'
  },
  {
    title: 'Company Suite',
    meta: 'HTML · CSS · JavaScript · PWA',
    summary:
      'A zero-dependency static PWA combining a Quotation Maker and Receipt Maker into one app, with a shared launcher, persistent navigation switcher, and offline service-worker support.',
    link: 'https://github.com/vrxe0274/company-suite',
    image: '/assets/projects/Company-Suite Preview.png'
  }
];

export const contactMethods = [
  {
    label: 'Phone',
    value: '+63 927 664 6821',
    href: 'tel:+639276646821'
  },
  {
    label: 'Email',
    value: 'neo.monserrat@gmail.com',
    href: 'mailto:neo.monserrat@gmail.com'
  },
  {
    label: 'LinkedIn',
    value: 'antonio-enrique-monserrat',
    href: 'https://www.linkedin.com/in/antonio-enrique-monserrat-232ab6328'
  },
  {
    label: 'GitHub',
    value: '@NeoMonserrat',
    href: 'https://github.com/NeoMonserrat'
  }
];

export const certifications = [
  {
    title: 'Agile Testing Certification',
    issuer: 'QE 360',
    date: 'Oct 2025',
    description:
      'Completed and passed Agile Testing Certification focused on QA workflows, testing principles, and agile software delivery.',
    skills: ['QA Testing', 'Agile', 'Software QA'],
    image: '/assets/agile-testing.png',
    link: '/assets/QE360_AGILE-TESTER-CERTIFICATE.pdf'
  }
];