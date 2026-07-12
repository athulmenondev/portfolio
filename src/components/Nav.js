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

        <ul className={`nav-links${menuOpen ? ' mobile-open' : ''}`}>
          {data.links.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a className="btn-nav btn-nav--download" href="/Athul%20S%20Menon__July_26.pdf" download onClick={closeMenu}>
            <Download size={14} />
            Resume
          </a>
          <a className="btn-nav" href="#contact" onClick={closeMenu}>
            {data.hireMe.replace('→', '').replace('↗', '')}
            <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      {/* Mobile overlay backdrop */}
      <div
        className={`mobile-overlay ${menuOpen ? 'visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

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
