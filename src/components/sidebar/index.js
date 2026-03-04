// ─── src/components/sidebar/index.js ─────────────────────────────────────────

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

const NAV_LINKS = [
  { to: '/',         label: 'Home',    num: '00' },
  { to: '/about',    label: 'About',   num: '01' },
  { to: '/projects', label: 'Works',   num: '02' },
  { to: '/contact',  label: 'Contact', num: '03' },
];

const SOCIAL_LINKS = [
  {
    label: 'GH',
    title: 'GitHub',
    href:  'https://github.com/athulmenondev',
  },
  {
    label: 'LI',
    title: 'LinkedIn',
    href:  'https://www.linkedin.com/in/athul-s-menon-a22857296/',
  },
  {
    label: 'IG',
    title: 'Instagram',
    href:  'https://www.instagram.com/linuxid_/',
  },
];

const Sidebar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 160);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside className={`sidebar ${mounted ? 'sidebar--visible' : ''}`}>

      {/* ── Brand monogram ── */}
      <NavLink to="/" className="sidebar__brand" aria-label="Home">
        <span className="sidebar__brand-text">am</span>
      </NavLink>

      {/* ── Vertical rule ── */}
      <div className="sidebar__rule" aria-hidden="true" />

      {/* ── Page nav (dot indicators) ── */}
      <nav className="sidebar__nav" aria-label="Page navigation">
        {NAV_LINKS.map(({ to, label, num }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
            }
            aria-label={`${num}. ${label}`}
          >
            <span className="sidebar__nav-dot" aria-hidden="true" />
            <span className="sidebar__nav-tooltip">{num}. {label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Vertical rule ── */}
      <div className="sidebar__rule" aria-hidden="true" />

      {/* ── Social links ── */}
      <ul className="sidebar__social" aria-label="Social links">
        {SOCIAL_LINKS.map(({ label, title, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="sidebar__social-link"
              aria-label={title}
              title={title}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* ── Rotated label ── */}
      <span className="sidebar__rotated-label" aria-hidden="true">
        portfolio · 2025
      </span>

    </aside>
  );
};

export default Sidebar;