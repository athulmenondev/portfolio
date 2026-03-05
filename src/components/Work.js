import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   DATA — first entry is the FEATURED project
───────────────────────────────────────────────────────── */
const FEATURED = {
  year:  '2026',
  tag:   'CTF Platform',
  color: '#6B4CFF',
  title: 'Mini-CTF Platform',
  desc:  'A premium, high-performance event platform for conducting Capture-the-Flag competitions. Features a cyber-elite interactive UI, real-time leaderboard, automated flag-scoring engine and single-event registration — built end-to-end.',
  tech:  ['Node.js', 'Supabase', 'MongoDB Atlas', 'React', 'Tailwind CSS'],
  image: '/assets/hacknova.jpg',
  links: [
    { label: 'Live Demo', url: 'https://introtoctf.vercel.app', primary: true },
    { label: 'GitHub',    url: 'https://github.com/athulmenondev', primary: false },
  ],
};

const PROJECTS = [
  {
    num:   '02',
    year:  '2025',
    tag:   'AI / ML',
    color: '#10B981',
    title: 'AI Project Manager',
    desc:  'Autonomous project assistant powered by Generative AI. Breaks down goals, assigns tasks, tracks progress and generates weekly reports via a Flask API.',
    tech:  ['Python', 'Flask', 'Firebase', 'Generative AI'],
    image: '/assets/aikudumbam.jpg',
    links: [{ label: 'GitHub', url: 'https://github.com/athulmenondev', primary: true }],
  },
  {
    num:   '03',
    year:  '2025',
    tag:   'Security',
    color: '#F59E0B',
    title: 'Phishing Detection Tool',
    desc:  'Browser extension + ML backend that analyses URLs, DOM fingerprints and SSL signals to identify phishing pages in real-time.',
    tech:  ['JavaScript', 'Python', 'Chrome Extension API', 'Flask'],
    image: '/assets/revup.jpg',
    links: [{ label: 'GitHub', url: 'https://github.com/athulmenondev', primary: true }],
  },
  {
    num:   '04',
    year:  '2024',
    tag:   'Frontend',
    color: '#6B4CFF',
    title: 'Solasta Tech Fest',
    desc:  'Event management website for the annual CS-department tech fest. Handles registration, live result updates and 500+ concurrent visitors.',
    tech:  ['React', 'Next.js', 'Tailwind CSS'],
    image: '/assets/solasta.jpg',
    links: [
      { label: 'Live Demo', url: 'https://solastadev.live/', primary: true },
      { label: 'GitHub',    url: 'https://github.com/athulmenondev/solasta', primary: false },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   TILT  (mouse follow per card)
───────────────────────────────────────────────────────── */
const onTiltMove = (e) => {
  const card = e.currentTarget;
  const { left, top, width, height } = card.getBoundingClientRect();
  const rx = ((e.clientY - top)  / height - 0.5) * -14;
  const ry = ((e.clientX - left) / width  - 0.5) *  14;
  gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 900, ease: 'power1.out', duration: 0.35 });
  const glare = card.querySelector('.wc-glare');
  if (glare) {
    const px = ((e.clientX - left) / width)  * 100;
    const py = ((e.clientY - top)  / height) * 100;
    glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,.09) 0%, transparent 60%)`;
  }
};
const onTiltLeave = (e) => {
  gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, ease: 'power2.out', duration: 0.55 });
  const g = e.currentTarget.querySelector('.wc-glare');
  if (g) g.style.background = 'none';
};

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
const Work = ({ data }) => {
  const wrapRef    = useRef(null);   /* scroll proxy                   */
  const pinRef     = useRef(null);   /* 100vh pinned panel             */
  const trackRef   = useRef(null);   /* x-moving strip                 */
  /* bg-div refs for parallax — one per card (featured + 3 regular) */
  const bgRefs     = useRef([]);

  useGSAP(() => {
    const wrap  = wrapRef.current;
    const pin   = pinRef.current;
    const track = trackRef.current;
    if (!wrap || !pin || !track) return;

    /* scrollable distance */
    const getTotalX = () => -(track.scrollWidth - window.innerWidth);

    /* ── Main horizontal pin ── */
    const mainTween = gsap.to(track, {
      x:    getTotalX,
      ease: 'none',
      scrollTrigger: {
        trigger:             wrap,
        pin:                 pin,
        start:               'top top',
        end:                 () => `+=${track.scrollWidth - window.innerWidth}`,
        scrub:               1,
        anticipatePin:       1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const bar = pin.querySelector('.wc-progress-fill');
          if (bar) bar.style.width = `${self.progress * 100}%`;
        },
      },
    });

    /* ── Background parallax (xPercent hardware accelerated) ────────────
       Each card uses a `div.wc-bg` or `wf-bg` that is wider than the card
       (e.g. 130% width, left: -15%). We animate xPercent from -10 to 10
       to slide the image within the container, linked to the horizontal scrub. */
    bgRefs.current.forEach((bg) => {
      if (!bg) return;
      const card = bg.closest('.work-card, .wf-card');
      if (!card) return;

      gsap.fromTo(bg,
        { xPercent: -15 },
        {
          xPercent: 15,
          ease:     'none',
          scrollTrigger: {
            trigger:            card,
            containerAnimation: mainTween,
            start:              'left right',
            end:                'right left',
            scrub:              true,
          },
        }
      );
    });

    /* ── Card body reveal ── */
    gsap.utils.toArray('.work-card').forEach((card) => {
      const inner = card.querySelector('.wc-body-inner');
      if (!inner) return;
      gsap.fromTo(inner,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger:            card,
            containerAnimation: mainTween,
            start:              'left 78%',
            toggleActions:      'play none none reverse',
          },
        }
      );
    });

    /* ── Featured card reveal ── */
    const featInner = pin.querySelector('.wf-inner');
    if (featInner) {
      gsap.fromTo(featInner,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 }
      );
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, { scope: wrapRef });

  return (
    <div ref={wrapRef} id="work" className="work-outer">
      <div ref={pinRef} className="work-pin">

        {/* ── Header ── */}
        <div className="work-hd">
          <div>
            <p className="section-eyebrow">{data?.eyebrow ?? 'Selected Work'}</p>
            <h2 className="work-heading">{data?.heading ?? 'Featured Projects'}</h2>
          </div>
          <div className="work-hd-right">
            <span className="section-link">{data?.dateRange ?? '2023 – Present'}</span>
            <span className="work-count">{PROJECTS.length + 1} projects</span>
          </div>
        </div>

        {/* ── Horizontal track ── */}
        <div className="work-track-wrap">
          <div className="work-track" ref={trackRef}>

            {/* ══════════════════════════════════════════
                FEATURED CARD — wide, side-by-side layout
            ══════════════════════════════════════════ */}
            <article
              className="wf-card"
              style={{ '--ac': FEATURED.color }}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              {/* bg with parallax */}
              <div
                className="wf-bg"
                ref={(el) => { bgRefs.current[0] = el; }}
                style={{ backgroundImage: `url(${FEATURED.image})` }}
              />
              {/* tint overlay */}
              <div className="wf-overlay" />
              {/* glare */}
              <div className="wc-glare" />

              {/* content on top */}
              <div className="wf-inner">
                <div className="wf-badge">
                  <Star size={11} />
                  Best Project · {FEATURED.year}
                </div>
                <span className="wc-tag">{FEATURED.tag}</span>
                <h3 className="wf-title">{FEATURED.title}</h3>
                <p  className="wf-desc">{FEATURED.desc}</p>
                <div className="wc-tech-row">
                  {FEATURED.tech.map((t) => <span key={t} className="wc-badge wc-badge--light">{t}</span>)}
                </div>
                <div className="wc-links">
                  {FEATURED.links.map((lk, j) => (
                    <a key={j} href={lk.url} target="_blank" rel="noreferrer"
                      className={`wc-btn ${lk.primary ? 'wc-btn--fill' : 'wc-btn--ghost wc-btn--ghost-light'}`}>
                      {lk.label}<ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              </div>

              {/* accent glow */}
              <div className="wc-glow" />
            </article>

            {/* ══════════════════════════════════════════
                REGULAR CARDS
            ══════════════════════════════════════════ */}
            {PROJECTS.map((proj, i) => (
              <article
                key={proj.num}
                className="work-card"
                style={{ '--ac': proj.color }}
                onMouseMove={onTiltMove}
                onMouseLeave={onTiltLeave}
              >
                {/* bg with parallax */}
                <div
                  className="wc-bg"
                  ref={(el) => { bgRefs.current[i + 1] = el; }}
                  style={{ backgroundImage: `url(${proj.image})` }}
                />
                <div className="wc-img-fade" />
                <div className="wc-glare" />
                <div className="wc-glow" />

                <div className="wc-body">
                  <div className="wc-body-inner">
                    <div className="wc-meta">
                      <span className="wc-tag">{proj.tag}</span>
                      <span className="wc-year">{proj.year}</span>
                      <span className="wc-num">{proj.num} / 0{PROJECTS.length + 1}</span>
                    </div>
                    <h3 className="wc-title">{proj.title}</h3>
                    <p  className="wc-desc">{proj.desc}</p>
                    <div className="wc-tech-row">
                      {proj.tech.map((t) => <span key={t} className="wc-badge">{t}</span>)}
                    </div>
                    <div className="wc-links">
                      {proj.links.map((lk, j) => (
                        <a key={j} href={lk.url} target="_blank" rel="noreferrer"
                          className={`wc-btn ${lk.primary ? 'wc-btn--fill' : 'wc-btn--ghost'}`}>
                          {lk.label}<ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* end cta */}
            <div className="work-cta-card">
              <p className="work-cta-mono">{'// see more'}</p>
              <a href="https://github.com/athulmenondev" target="_blank" rel="noreferrer"
                className="work-cta-link">
                github.com/<br />athulmenondev<ArrowUpRight size={20} />
              </a>
            </div>

          </div>
        </div>

        <div className="wc-progress"><div className="wc-progress-fill" /></div>
      </div>
    </div>
  );
};

export default Work;
