// ─── src/components/navbar/index.js ──────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './Navbar.scss';

const NAV_LINKS = [
  { to: '/about',    label: 'About',   num: '01' },
  { to: '/projects', label: 'Works',   num: '02' },
  { to: '/contact',  label: 'Contact', num: '03' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${mounted ? 'navbar--visible' : ''}`}>

      {/* Spacer that matches sidebar width on desktop — keeps nav links centered */}
      <div className="navbar__sidebar-spacer" aria-hidden="true" />

      {/* ── Nav links ── */}
      <nav className="navbar__nav" aria-label="Primary navigation">
        {NAV_LINKS.map(({ to, label, num }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
          >
            <span className="navbar__link-num">{num}.</span>
            <span className="navbar__link-label">{label}</span>
            <span className="navbar__link-underline" aria-hidden="true" />
          </NavLink>
        ))}
      </nav>

      {/* ── Theme toggle ── */}
      <button
        className="navbar__theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        [ {theme === 'dark' ? 'light' : 'dark'} ]
      </button>
    </header>
  );
};

export default Navbar;