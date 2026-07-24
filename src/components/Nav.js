import { useEffect, useState } from 'react';
import { Sun, Moon, ArrowRight, ArrowUp, Download } from 'lucide-react';

const Nav = ({ data }) => {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize past mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleTheme = () => {
    const isLight = !light;
    setLight(isLight);
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-brand">
          <span className="nav-name">{data.name}</span>
        </div>

        {/* Desktop links */}
        <ul className="nav-links-desktop">
          {data.links.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <a className="btn-nav btn-nav--download nav-dl-desktop" href="/Athul%20S%20Menon__July_26.pdf" download>
            <Download size={14} />
            Resume
          </a>
          <a className="btn-nav" href="#contact">
            {data.hireMe.replace('→', '').replace('↗', '')}
            <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      {/* ── Mobile terminal overlay ── */}
      <div className={`mobile-overlay ${menuOpen ? 'visible' : ''}`} onClick={closeMenu} aria-hidden="true" />

      <div className={`mobile-term ${menuOpen ? 'open' : ''}`} role="dialog" aria-label="Navigation menu">
        {/* Scanline atmosphere */}
        <div className="mobile-term-scanlines" />

        {/* Terminal header bar */}
        <div className="mobile-term-bar">
          <div className="terminal-dots-row">
            <span className="dot red" />
            <span className="dot amber" />
            <span className="dot green" />
          </div>
          <span className="mobile-term-title">nav.sh</span>
          <button className="mobile-term-close" onClick={closeMenu} aria-label="Close menu">
            ✕
          </button>
        </div>

        {/* Command list */}
        <div className="mobile-term-body">
          {data.links.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="mobile-term-link"
              onClick={closeMenu}
              style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.06}s` : '0s' }}
            >
              <span className="mt-prompt">$</span>
              <span className="mt-num">{String(i + 1).padStart(2, '0')}.</span>
              <span className="mt-label">{link.label}</span>
              <span className="mt-line" />
            </a>
          ))}

          {/* Resume download */}
          <a
            href="/Athul%20S%20Menon__July_26.pdf"
            download
            className="mobile-term-link mt-resume"
            onClick={closeMenu}
            style={{ transitionDelay: menuOpen ? `${0.1 + data.links.length * 0.06}s` : '0s' }}
          >
            <span className="mt-prompt">$</span>
            <span className="mt-num">↗</span>
            <span className="mt-label">Resume</span>
            <Download size={13} className="mt-icon" />
          </a>
        </div>

        {/* Footer */}
        <div className="mobile-term-footer">
          <span className="mt-footer-line" />
          <span className="mt-footer-name">{data.name}</span>
          <span className="mt-footer-line" />
        </div>
      </div>

      <div className="floating-actions">
        <button className={`scroll-top-btn ${scrolled ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
          <ArrowUp size={20} />
        </button>
        <button className="theme-floating-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {light ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </>
  );
};

export default Nav;
