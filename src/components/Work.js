import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   PROJECT DATA
   Images in /assets/ (public folder).
   Colour-coded placeholders for missing images.
───────────────────────────────────────────── */
const PROJECTS = [
  {
    num:   '01',
    year:  '2026',
    tag:   'CTF Platform',
    color: '#6B4CFF',
    title: 'Mini-CTF Platform',
    desc:  'A premium, high-performance event platform for conducting CTF competitions. Features a cyber-elite interactive UI, real-time leaderboard, automated scoring and single-event registration.',
    tech:  ['Node.js', 'Supabase', 'MongoDB Atlas', 'React'],
    image: '/assets/hacknova.jpg',
    links: [
      { label: 'Live Demo ↗', url: 'https://introtoctf.vercel.app', primary: true },
      { label: 'GitHub ↗',    url: 'https://github.com/athulmenondev', primary: false },
    ],
  },
  {
    num:   '02',
    year:  '2025',
    tag:   'AI / ML',
    color: '#10B981',
    title: 'AI Project Manager',
    desc:  'Autonomous project management assistant powered by Generative AI. Uses LLM reasoning to break down goals, assign tasks, track progress and generate weekly reports via a Flask API.',
    tech:  ['Python', 'Flask', 'Firebase', 'Generative AI'],
    image: '/assets/aikudumbam.jpg',
    links: [
      { label: 'GitHub ↗', url: 'https://github.com/athulmenondev', primary: true },
    ],
  },
  {
    num:   '03',
    year:  '2025',
    tag:   'Security',
    color: '#F59E0B',
    title: 'Phishing Detection Tool',
    desc:  'End-to-end phishing detection solution: a custom browser extension that intercepts navigation events and a backend ML classifier that analyses URLs, DOM fingerprints and SSL signals in real-time.',
    tech:  ['JavaScript', 'Python', 'Chrome Extension API', 'Flask'],
    image: '/assets/revup.jpg',
    links: [
      { label: 'GitHub ↗', url: 'https://github.com/athulmenondev', primary: true },
    ],
  },
  {
    num:   '04',
    year:  '2024',
    tag:   'Frontend',
    color: '#6B4CFF',
    title: 'Solasta Tech Fest',
    desc:  'Dynamic event management website for the annual CS-department tech fest. Features event registration, live result updates and a responsive editorial layout handling 500+ concurrent visitors.',
    tech:  ['React', 'Next.js', 'Tailwind CSS'],
    image: '/assets/solasta.jpg',
    links: [
      { label: 'Live Demo ↗', url: 'https://solastadev.live/', primary: true },
      { label: 'GitHub ↗',    url: 'https://github.com/athulmenondev/solasta', primary: false },
    ],
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const Work = ({ data }) => {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const imgRefs     = useRef([]);

  useGSAP(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    /* ── How far we need to scroll horizontally ── */
    const getScrollAmount = () =>
      -(track.scrollWidth - window.innerWidth);

    /* ── Pin + horizontal scroll ── */
    const hmTween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger:    section,
        start:      'top top',
        end:        () => `+=${track.scrollWidth}`,
        pin:        true,
        scrub:      1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    /* ── Per-card image parallax ── */
    imgRefs.current.forEach((img) => {
      if (!img) return;
      gsap.fromTo(
        img,
        { x: '-8%' },
        {
          x: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger:             img.closest('.work-card'),
            containerAnimation:  hmTween,
            start:               'left right',
            end:                 'right left',
            scrub:               true,
          },
        }
      );
    });

    /* ── Card entrance stagger (fade + lift as they enter from the right) ── */
    gsap.utils.toArray('.work-card').forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y:       0,
          duration: 0.7,
          ease:    'power3.out',
          scrollTrigger: {
            trigger:           card,
            containerAnimation: hmTween,
            start:             'left 90%',
            end:               'left 55%',
            scrub:             false,
            toggleActions:     'play none none reverse',
          },
        }
      );
    });

    /* ── Progress bar ── */
    const progressBar = section.querySelector('.work-progress-bar');
    if (progressBar) {
      gsap.to(progressBar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger:    section,
          start:      'top top',
          end:        () => `+=${track.scrollWidth}`,
          scrub:      true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, { scope: sectionRef });

  return (
    <section id="work" ref={sectionRef} className="work-section">

      {/* ── sticky header (visible above the pinned panel) ── */}
      <div className="work-header">
        <div>
          <p className="section-eyebrow">{data?.eyebrow ?? 'Selected Work'}</p>
          <h2 className="section-heading">{data?.heading ?? 'Featured Projects'}</h2>
        </div>
        <span className="section-link">{data?.dateRange ?? '2023 – Present'}</span>
      </div>

      {/* ── horizontal track ── */}
      <div className="work-track-outer">
        <div className="work-track" ref={trackRef}>

          {PROJECTS.map((proj, i) => (
            <article
              key={proj.num}
              className="work-card"
              style={{ '--card-accent': proj.color }}
            >
              {/* image with parallax child */}
              <div className="wc-img-wrap">
                <img
                  ref={(el) => (imgRefs.current[i] = el)}
                  src={proj.image}
                  alt={proj.title}
                  className="wc-img"
                  loading="lazy"
                />
                {/* tinted overlay */}
                <div className="wc-img-overlay" />
              </div>

              {/* card body */}
              <div className="wc-body">
                <div className="wc-meta">
                  <span className="wc-tag" style={{ color: proj.color, borderColor: `${proj.color}55` }}>
                    {proj.tag}
                  </span>
                  <span className="wc-num">{proj.num} / {String(PROJECTS.length).padStart(2, '0')}</span>
                  <span className="wc-year">{proj.year}</span>
                </div>

                <h3 className="wc-title">{proj.title}</h3>
                <p className="wc-desc">{proj.desc}</p>

                <div className="wc-tech">
                  {proj.tech.map((t) => (
                    <span key={t} className="wc-tech-badge">{t}</span>
                  ))}
                </div>

                <div className="wc-links">
                  {proj.links.map((lnk, j) => (
                    <a
                      key={j}
                      href={lnk.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`wc-btn ${lnk.primary ? 'wc-btn--primary' : 'wc-btn--ghost'}`}
                    >
                      {lnk.label.replace('↗', '').trim()}
                      <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              </div>

              {/* accent glow */}
              <div className="wc-glow" />
            </article>
          ))}

          {/* — end card — */}
          <div className="work-end-card">
            <p className="work-end-label">{'// more on GitHub'}</p>
            <a
              href="https://github.com/athulmenondev"
              target="_blank"
              rel="noreferrer"
              className="work-end-link"
            >
              github.com/athulmenondev
              <ArrowUpRight size={18} />
            </a>
          </div>

        </div>
      </div>

      {/* scroll-progress bar */}
      <div className="work-progress-bar" id="work-progress" />

    </section>
  );
};

export default Work;
