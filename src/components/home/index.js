// ─── src/components/home/index.js ────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import './index.scss';

// ── Real project data (from public/data.json shape) ──────────────────────────
const FEATURED = [
  {
    num:    '01',
    title:  'Solasta Event Website',
    tags:   ['React', 'Next.js', 'Tailwind CSS'],
    type:   'full-stack',
    href:   '/projects',
    demo:   'https://solastadev.vercel.app/',
    image:  '/assets/solasta.jpg',
  },
  {
    num:    '02',
    title:  'AIKudumbam',
    tags:   ['React', 'HTML', 'CSS', 'JavaScript'],
    type:   'full-stack',
    href:   '/projects',
    demo:   '',
    image:  '/assets/aikudumbam.jpg',
  },
];

// ── Word-reveal animation helpers ─────────────────────────────────────────────
const WORD_VARIANTS = {
  hidden:  { y: '105%' },
  visible: (i) => ({
    y: 0,
    transition: {
      duration: 0.82,
      ease:     [0.16, 1, 0.3, 1],
      delay:    i * 0.07,
    },
  }),
};

const WordReveal = ({ text, className = '', baseDelay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="wr" aria-hidden="true">
          <motion.span
            className="wi"
            variants={WORD_VARIANTS}
            custom={i + baseDelay}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
};

// ── Stack badge tag color by type ─────────────────────────────────────────────
const tagColor = (type) => {
  if (type === 'full-stack') return 'blue';
  if (type === 'cli')        return 'green';
  if (type === 'data')       return 'amber';
  return 'blue';
};

// ── Main component ────────────────────────────────────────────────────────────
const Home = () => {
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Refs for scroll-reveal sections
  const worksRef    = useRef(null);
  const connectRef  = useRef(null);
  const worksInView   = useInView(worksRef,   { once: true, margin: '-80px' });
  const connectInView = useInView(connectRef, { once: true, margin: '-80px' });

  return (
    <div className="home">

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section className="home__hero">

        {/* Left column */}
        <div className="home__hero-left">

          {/* Eyebrow */}
          <motion.p
            className="home__eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={heroReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            // frontend developer
          </motion.p>

          {/* Hero heading — word reveal */}
          <motion.h1
            className="home__hero-title"
            initial="hidden"
            animate={heroReady ? 'visible' : 'hidden'}
          >
            <WordReveal text="Athul" baseDelay={0} />
            <br aria-hidden="true" />
            <WordReveal text="Menon." baseDelay={1} />
          </motion.h1>

          {/* Mono tagline — syntax-highlight style */}
          <motion.div
            className="home__tagline"
            initial={{ opacity: 0 }}
            animate={heroReady ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <span className="syn-keyword">const</span>{' '}
            <span className="syn-function">developer</span>{' '}
            <span className="syn-property">=</span>{' '}
            <span className="syn-string">"crafting interfaces</span>
            <br />
            <span className="syn-string">&nbsp;that feel tangible"</span>
            <span className="syn-property">;</span>
          </motion.div>

          {/* CTA row */}
          <motion.div
            className="home__cta-row"
            initial={{ opacity: 0, y: 12 }}
            animate={heroReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
          >
            <Link to="/projects" className="home__btn-primary">
              View Works ↗
            </Link>
            <Link to="/contact" className="home__btn-ghost">
              Get in Touch
            </Link>
          </motion.div>

          {/* Stack badges */}
          <motion.div
            className="home__stack"
            initial={{ opacity: 0 }}
            animate={heroReady ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 1.25 }}
          >
            {['React', 'Next.js', 'JavaScript', 'HTML/CSS'].map((s) => (
              <span key={s} className="home__stack-badge">{s}</span>
            ))}
          </motion.div>
        </div>

        {/* Right column — live code window mock */}
        <motion.div
          className="home__hero-right"
          initial={{ opacity: 0, x: 24 }}
          animate={heroReady ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div className="home__code-window">
            {/* Window chrome */}
            <div className="home__code-chrome">
              <span className="chrome-dot chrome-dot--red"   />
              <span className="chrome-dot chrome-dot--amber" />
              <span className="chrome-dot chrome-dot--green" />
              <span className="chrome-dot chrome-dot--label">portfolio.jsx</span>
            </div>
            {/* Code body */}
            <pre className="home__code-body" aria-hidden="true">
              <code>
                <span className="syn-comment">{'// about me'}</span>{'\n'}
                <span className="syn-keyword">const</span>{' '}
                <span className="syn-function">Athul</span>{' = () => {\n'}
                {'  '}<span className="syn-keyword">return</span>{' (\n'}
                {'    <'}<span className="syn-class">Developer</span>{'\n'}
                {'      '}<span className="syn-property">role</span>{'='}<span className="syn-string">{"\"Frontend\""}</span>{'\n'}
                {'      '}<span className="syn-property">based</span>{'='}<span className="syn-string">{"\"Kerala, IN\""}</span>{'\n'}
                {'      '}<span className="syn-property">loves</span>{'='}<span className="syn-string">{"\"Linux + React\""}</span>{'\n'}
                {'      '}<span className="syn-property">open</span>{'='}<span className="syn-string">{"\"to work\""}</span>{'\n'}
                {'    />\n'}
                {'  );\n'}
                {'};\n\n'}
                <span className="syn-keyword">export default</span>{' '}
                <span className="syn-function">Athul</span>
                <span className="home__code-cursor" aria-hidden="true">▋</span>
              </code>
            </pre>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="home__scroll-hint"
          initial={{ opacity: 0 }}
          animate={heroReady ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          aria-hidden="true"
        >
          <span className="home__scroll-line" />
          <span className="home__scroll-label">scroll</span>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════
          SELECTED WORKS
      ════════════════════════════════════════════════ */}
      <section className="home__works" ref={worksRef} id="works">

        {/* Section header */}
        <div className={`home__works-header reveal ${worksInView ? 'reveal--visible' : ''}`}>
          <p className="home__eyebrow">// selected works</p>
          <h2 className="home__works-heading">Featured<br /><em>Projects</em></h2>
        </div>

        {/* Project cards */}
        {FEATURED.map(({ num, title, tags, type, href, demo, image }, idx) => {
          const color = tagColor(type);
          return (
            <article
              key={num}
              className={`home__project home__project--${idx % 2 === 0 ? 'left' : 'right'} reveal ${worksInView ? 'reveal--visible' : ''}`}
              style={{ transitionDelay: `${idx * 0.18}s` }}
            >
              {/* Faint number */}
              <span className="home__project-num" aria-hidden="true">{num}</span>

              {/* Image */}
              <motion.div
                className="home__project-img-wrap"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={href}>
                  <img src={image} alt={title} className="home__project-img" loading="lazy" />
                </Link>
              </motion.div>

              {/* Meta */}
              <div className="home__project-meta">
                <h3 className="home__project-title">{title}</h3>
                <div className="home__project-tags">
                  {tags.map((tag) => (
                    <span key={tag} className={`home__tag home__tag--${color}`}>{tag}</span>
                  ))}
                </div>
                <div className="home__project-links">
                  <Link to={href} className="home__btn-ghost home__btn-ghost--sm">
                    Case Study →
                  </Link>
                  {demo && (
                    <a href={demo} target="_blank" rel="noreferrer" className="home__btn-primary home__btn-primary--sm">
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {/* All works CTA */}
        <div className={`home__works-all reveal ${worksInView ? 'reveal--visible' : ''}`} style={{ transitionDelay: '0.36s' }}>
          <Link to="/projects" className="home__btn-ghost">
            View All Projects →
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CONNECT / FOOTER CTA
      ════════════════════════════════════════════════ */}
      <section className="home__connect" ref={connectRef}>
        <div className={`home__connect-inner reveal ${connectInView ? 'reveal--visible' : ''}`}>
          <p className="home__eyebrow home__eyebrow--light">// what's next</p>
          <Link to="/contact" className="home__connect-heading">
            Let's<br /><em>Talk.</em>
          </Link>
          <p className="home__connect-sub">
            <span className="syn-function">sendEmail</span>
            <span className="syn-property">(</span>
            <span className="syn-string">"new project"</span>
            <span className="syn-property">)</span>
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;