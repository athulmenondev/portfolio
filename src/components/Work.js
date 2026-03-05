import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────────────────── */
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
      { label: 'Live Demo', url: 'https://introtoctf.vercel.app', primary: true },
      { label: 'GitHub',    url: 'https://github.com/athulmenondev', primary: false },
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
      { label: 'GitHub', url: 'https://github.com/athulmenondev', primary: true },
    ],
  },
  {
    num:   '03',
    year:  '2025',
    tag:   'Security',
    color: '#F59E0B',
    title: 'Phishing Detection Tool',
    desc:  'End-to-end phishing detection: a browser extension that intercepts navigation events and a backend ML classifier that analyses URLs, DOM fingerprints and SSL signals in real-time.',
    tech:  ['JavaScript', 'Python', 'Chrome Extension API', 'Flask'],
    image: '/assets/revup.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/athulmenondev', primary: true },
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
      { label: 'Live Demo', url: 'https://solastadev.live/', primary: true },
      { label: 'GitHub',    url: 'https://github.com/athulmenondev/solasta', primary: false },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   3-D TILT HELPERS  (mouse follow per card)
───────────────────────────────────────────────────────── */
const handleTiltMove = (e) => {
  const card = e.currentTarget;
  const { left, top, width, height } = card.getBoundingClientRect();
  const x = ((e.clientX - left) / width  - 0.5) * 18;  /* deg */
  const y = ((e.clientY - top)  / height - 0.5) * -18;
  gsap.to(card, {
    rotateX: y,
    rotateY: x,
    transformPerspective: 900,
    ease: 'power1.out',
    duration: 0.4,
  });
  /* Also shift the glare overlay */
  const glare = card.querySelector('.wc-glare');
  if (glare) {
    const px = ((e.clientX - left) / width)  * 100;
    const py = ((e.clientY - top)  / height) * 100;
    glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.08) 0%, transparent 65%)`;
  }
};

const handleTiltLeave = (e) => {
  const card = e.currentTarget;
  gsap.to(card, {
    rotateX: 0, rotateY: 0,
    ease: 'power2.out',
    duration: 0.6,
  });
  const glare = card.querySelector('.wc-glare');
  if (glare) glare.style.background = 'none';
};

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
const Work = ({ data }) => {
  const wrapRef  = useRef(null);  /* the tall scroll-proxy wrapper */
  const pinRef   = useRef(null);  /* the pinned viewport panel     */
  const trackRef = useRef(null);  /* the x-moving strip of cards   */
  const imgRefs  = useRef([]);    /* one <img> per card            */

  useGSAP(() => {
    const wrap  = wrapRef.current;
    const pin   = pinRef.current;
    const track = trackRef.current;
    if (!wrap || !pin || !track) return;

    /* ── Total horizontal distance to scroll ──
       Each card is 520px wide + 20px gap = 540px.
       We want the last card to stop flush at viewport right edge.
       Use scrollWidth - pin clientWidth for the exact amount.        */
    const getTotalX = () => -(track.scrollWidth - pin.clientWidth);

    /* ── Main pin + horizontal scrub ── */
    const mainTween = gsap.to(track, {
      x:    getTotalX,
      ease: 'none',
      scrollTrigger: {
        trigger:             wrap,
        pin:                 pin,
        start:               'top top',
        end:                 () => `+=${track.scrollWidth - pin.clientWidth}`,
        scrub:               1,
        anticipatePin:       1,
        invalidateOnRefresh: true,
        /* Progress bar */
        onUpdate: (self) => {
          const bar = pin.querySelector('.wc-progress-fill');
          if (bar) bar.style.width = `${self.progress * 100}%`;
        },
      },
    });

    /* ── Per-image VERTICAL parallax (yPercent) ──
       Image is 140% tall, starts at yPercent -20, ends at 0.
       containerAnimation links it to the horizontal scrub.            */
    imgRefs.current.forEach((img, i) => {
      if (!img) return;
      const card = img.closest('.work-card');
      if (!card) return;

      gsap.fromTo(img,
        { yPercent: -20 },
        {
          yPercent: 10,
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

    /* ── Card reveal: fade + slide up as each enters from the right ── */
    gsap.utils.toArray('.work-card').forEach((card) => {
      const inner = card.querySelector('.wc-body-inner');
      if (!inner) return;
      gsap.fromTo(inner,
        { opacity: 0, y: 36 },
        {
          opacity:  1,
          y:        0,
          duration: 0.55,
          ease:     'power2.out',
          scrollTrigger: {
            trigger:            card,
            containerAnimation: mainTween,
            start:              'left 78%',
            toggleActions:      'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, { scope: wrapRef });

  return (
    /* ── Tall outer div: gives GSAP scroll room equal to track width ── */
    <div ref={wrapRef} id="work" className="work-outer">

      {/* ── Pinned panel: fills exactly 100vh ── */}
      <div ref={pinRef} className="work-pin">

        {/* header */}
        <div className="work-hd">
          <div>
            <p className="section-eyebrow">{data?.eyebrow ?? 'Selected Work'}</p>
            <h2 className="work-heading">{data?.heading ?? 'Featured Projects'}</h2>
          </div>
          <div className="work-hd-right">
            <span className="section-link">{data?.dateRange ?? '2023 – Present'}</span>
            <span className="work-count">{PROJECTS.length} projects</span>
          </div>
        </div>

        {/* cards strip */}
        <div className="work-track-wrap">
          <div className="work-track" ref={trackRef}>

            {PROJECTS.map((proj, i) => (
              <article
                key={proj.num}
                className="work-card"
                style={{ '--ac': proj.color }}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                {/* ── image with parallax ── */}
                <div className="wc-img-wrap">
                  <img
                    ref={(el) => { imgRefs.current[i] = el; }}
                    src={proj.image}
                    alt={proj.title}
                    className="wc-img"
                    loading="lazy"
                    draggable={false}
                  />
                  {/* bottom fade */}
                  <div className="wc-img-fade" />
                </div>

                {/* glare layer for tilt effect */}
                <div className="wc-glare" />

                {/* ── text body (revealed by GSAP) ── */}
                <div className="wc-body">
                  <div className="wc-body-inner">
                    <div className="wc-meta">
                      <span className="wc-tag">{proj.tag}</span>
                      <span className="wc-year">{proj.year}</span>
                      <span className="wc-num">{proj.num} / 0{PROJECTS.length}</span>
                    </div>

                    <h3 className="wc-title">{proj.title}</h3>
                    <p  className="wc-desc">{proj.desc}</p>

                    <div className="wc-tech-row">
                      {proj.tech.map((t) => <span key={t} className="wc-badge">{t}</span>)}
                    </div>

                    <div className="wc-links">
                      {proj.links.map((lk, j) => (
                        <a
                          key={j}
                          href={lk.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`wc-btn ${lk.primary ? 'wc-btn--fill' : 'wc-btn--ghost'}`}
                        >
                          {lk.label}
                          <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* accent glow */}
                <div className="wc-glow" />
              </article>
            ))}

            {/* — end cta — */}
            <div className="work-cta-card">
              <p className="work-cta-mono">{'// see more'}</p>
              <a
                href="https://github.com/athulmenondev"
                target="_blank"
                rel="noreferrer"
                className="work-cta-link"
              >
                github.com/<br />athulmenondev
                <ArrowUpRight size={20} />
              </a>
            </div>

          </div>
        </div>

        {/* progress bar */}
        <div className="wc-progress">
          <div className="wc-progress-fill" />
        </div>

      </div>
    </div>
  );
};

export default Work;
