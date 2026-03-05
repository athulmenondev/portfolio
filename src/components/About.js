import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   STACK GRID DATA
   Each item has: label, icon (emoji/char), category colour
───────────────────────────────────────────────────────── */
const STACK = [
  { label: 'Dart',                        icon: '◆', cat: 'Mobile',    color: '#54C5F8' },
  { label: 'Flutter',                     icon: '⬡', cat: 'Mobile',    color: '#54C5F8' },
  { label: 'Python',                      icon: '🐍', cat: 'Backend',   color: '#10B981' },
  { label: 'Node.js',                     icon: '◉', cat: 'Backend',   color: '#10B981' },
  { label: 'Data Structures & Algorithms',icon: '∑', cat: 'CS Core',   color: '#F59E0B' },
  { label: 'Web Exploitation / Crypto',   icon: '🔑', cat: 'Security',  color: '#EF4444' },
];

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
const About = ({ data }) => {
  const sectionRef  = useRef(null);
  /* heading + paragraph — "line mask" reveals */
  const headRef     = useRef(null);
  const paraRef     = useRef(null);
  /* individual stack cards */
  const stackRefs   = useRef([]);
  /* right-column blocks */
  const quoteRef    = useRef(null);
  const bodyRef     = useRef(null);
  const termRef     = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Shared trigger defaults */
    const triggerDefaults = {
      start:        'top 82%',
      toggleActions: 'play none none none',
    };

    /* ── 1. Heading mask reveal ── */
    if (headRef.current) {
      gsap.fromTo(
        headRef.current,
        { y: 50, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0, opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, ...triggerDefaults },
        }
      );
    }

    /* ── 2. Paragraph reveal ── */
    if (paraRef.current) {
      gsap.fromTo(
        paraRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: { trigger: paraRef.current, ...triggerDefaults },
        }
      );
    }

    /* ── 3. Stack cards — staggered pop ── */
    const cards = stackRefs.current.filter(Boolean);
    if (cards.length) {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cards[0].closest('.about-stack-grid'),
            start:   'top 84%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    /* ── 4. Quote block ── */
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, ...triggerDefaults },
        }
      );
    }

    /* ── 5. Body paragraphs ── */
    if (bodyRef.current) {
      const paras = bodyRef.current.querySelectorAll('.about-text');
      gsap.fromTo(
        paras,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: bodyRef.current, ...triggerDefaults },
        }
      );
    }

    /* ── 6. Terminal block ── */
    if (termRef.current) {
      gsap.fromTo(
        termRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: termRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef}>

      {/* ══════════════════════════════════════════════
          LEFT — profile card + info list
      ══════════════════════════════════════════════ */}
      <div className="about-left">
        <div className="profile-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="profile-avatar" style={{ border: 'none' }}>
            <img src="/athulsmenon.jpg" alt="Athul Menon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="profile-name">{data.profile.name}</div>
          <div className="profile-handle">{data.profile.handle}</div>
          <div className="status-row">
            <div className="status-dot" />
            {data.profile.status}
          </div>
          <p className="profile-bio">{data.profile.bio}</p>
        </div>

        <div className="info-list">
          {data.info.map((item, i) => (
            <div key={i} className="info-item">
              <span className="info-key">{item.key}</span>
              <span className="info-val" dangerouslySetInnerHTML={{ __html: item.val }} />
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          RIGHT — animated content
      ══════════════════════════════════════════════ */}
      <div className="about-right">
        <div className="section-eyebrow">{data.eyebrow}</div>

        {/* Quote */}
        <blockquote className="about-quote" ref={quoteRef}>
          {data.quote}
        </blockquote>

        {/* ── GSAP heading ── */}
        <div className="about-heading-wrap">
          <h2 className="about-gsap-heading" ref={headRef}>
            About Me
          </h2>
        </div>

        {/* ── GSAP paragraph ── */}
        <p className="about-gsap-para" ref={paraRef}>
          I am a Computer Science student at NSS College of Engineering, specialising in
          application development and cybersecurity.
        </p>

        {/* ── GSAP Stack Grid ── */}
        <div className="about-stack-section">
          <p className="about-stack-label">{'// core stack'}</p>
          <div className="about-stack-grid">
            {STACK.map((item, i) => (
              <div
                key={item.label}
                className="about-stack-card"
                ref={(el) => { stackRefs.current[i] = el; }}
                style={{ '--sc': item.color }}
              >
                <span className="asc-icon">{item.icon}</span>
                <div className="asc-body">
                  <span className="asc-cat">{item.cat}</span>
                  <span className="asc-label">{item.label}</span>
                </div>
                <div className="asc-glow" />
              </div>
            ))}
          </div>
        </div>

        {/* Body paragraphs */}
        <div className="about-body-row" ref={bodyRef}>
          <div className="about-text-col">
            {data.paragraphs.map((p, i) => (
              <p key={i} className="about-text" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
          <div className="about-cube-col">
            <div className="cube-container">
              <div className="cube">
                <div className="cube-face front">React</div>
                <div className="cube-face back">Next.js</div>
                <div className="cube-face right">Tailwind</div>
                <div className="cube-face left">Node</div>
                <div className="cube-face top">Linux</div>
                <div className="cube-face bottom">Git</div>
              </div>
            </div>
            <div className="cube-decor">
              <div className="cd-title">Tech Stack</div>
              <div className="cd-badges">
                <div className="cd-badge">Frontend</div>
                <div className="cd-badge">Backend</div>
                <div className="cd-badge">Systems</div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal skills */}
        <div className="skills-terminal" style={{ marginTop: 'var(--s4)' }} ref={termRef}>
          <div className="st-bar">
            <div className="dot red" />
            <div className="dot amber" />
            <div className="dot green" />
            <span className="st-title">{data.skills.title}</span>
          </div>
          <div className="st-body">
            {data.skills.lines.map((line, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <div className="st-line">
                  <span className="prompt">$</span>{' '}
                  <span className="st-cmd" dangerouslySetInnerHTML={{ __html: line.cmd }} />
                </div>
                <div className="st-line">
                  <span className="st-output">{line.out}</span>
                </div>
                {i < data.skills.lines.length - 1 && <div className="st-divider" />}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;