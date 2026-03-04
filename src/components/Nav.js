import { useEffect, useState } from 'react';
import { Sun, Moon, ArrowRight, ArrowUp } from 'lucide-react';

const Nav = ({ data }) => {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const isLight = !light;
    setLight(isLight);
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
  };

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-brand">
          <span className="nav-name">{data.name}</span>
        </div>
        <ul className="nav-links">
          {data.links.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <a className="btn-nav" href="#contact">
            {data.hireMe.replace('→', '').replace('↗', '')}
            <ArrowRight size={16} />
          </a>
        </div>
      </nav>
      
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
