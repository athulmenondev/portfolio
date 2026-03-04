// ─── src/components/about/index.js ───────────────────────────────────────────

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './index.scss';

// ── Static data ───────────────────────────────────────────────────────────────

const INFO_ROWS = [
  { key: 'os',       value: 'Linux / Debian' },
  { key: 'editor',   value: 'VS Code' },
  { key: 'shell',    value: 'bash' },
  { key: 'college',  value: 'NSS College of Engineering' },
  { key: 'cgpa',     value: '8.5 / 10.0' },
  { key: 'status',   value: 'open to work ✦' },
];

const LANGUAGES = ['JavaScript', 'Python', 'Java', 'C++', 'HTML', 'CSS'];
const TOOLS     = ['React', 'Next.js', 'Git', 'Linux', 'Tailwind'];

const EXPERIENCE = [
  {
    year:  '2024',
    role:  'Frontend Developer',
    place: 'Solasta — Tech Fest Website',
    desc:  'Built the annual CS department tech-fest platform with event registration and real-time updates.',
  },
  {
    year:  '2023',
    role:  'Web Developer',
    place: 'National Higher Secondary School',
    desc:  'Designed and developed a static website providing easy access to school information and resources.',
  },
  {
    year:  '2023',
    role:  'CS Undergraduate',
    place: 'NSS College of Engineering',
    desc:  'Pursuing Computer Science with a strong foundation in algorithms, systems, and web technologies.',
  },
];

// ── Reveal variants ───────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: d },
  }),
};

// ── Component ─────────────────────────────────────────────────────────────────

const About = () => {
  const sectionRef  = useRef(null);
  const skillsRef   = useRef(null);
  const timelineRef = useRef(null);

  const inView      = useInView(sectionRef,  { once: true, margin: '-60px' });
  const skillsView  = useInView(skillsRef,   { once: true, margin: '-60px' });
  const timelineView= useInView(timelineRef, { once: true, margin: '-60px' });

  return (
    <div className="about">

      {/* ════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════ */}
      <div className="about__header">
        <motion.p
          className="about__eyebrow"
          initial="hidden" animate="visible"
          variants={fadeUp} custom={0.1}
        >
          // who i am
        </motion.p>
        <motion.h1
          className="about__title"
          initial="hidden" animate="visible"
          variants={fadeUp} custom={0.2}
        >
          About <em>Me.</em>
        </motion.h1>
      </div>

      {/* ════════════════════════════════════════════
          MAIN GRID — sidebar + content
      ════════════════════════════════════════════ */}
      <div className="about__body" ref={sectionRef}>

        {/* ── LEFT: sticky profile sidebar ── */}
        <aside className="about__sidebar">
          <motion.div
            className="about__profile-card"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0.1}
          >
            <div className="about__profile-avatar">
              <span className="about__avatar-initials">AM</span>
              <span className="about__avatar-status" title="Open to work" />
            </div>
            <p className="about__profile-name">Athul Menon</p>
            <p className="about__profile-role">Frontend Developer</p>
          </motion.div>

          {/* Info table */}
          <motion.div
            className="about__info-table"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0.2}
          >
            {INFO_ROWS.map(({ key, value }) => (
              <div key={key} className="about__info-row">
                <span className="about__info-key">{key}</span>
                <span className="about__info-sep">:</span>
                <span className="about__info-value">{value}</span>
              </div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            className="about__sidebar-links"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0.3}
          >
            <a href="https://github.com/athulmenondev"
               target="_blank" rel="noreferrer"
               className="about__sidebar-link">
              GH ↗
            </a>
            <a href="https://www.linkedin.com/in/athul-s-menon-a22857296/"
               target="_blank" rel="noreferrer"
               className="about__sidebar-link">
              LI ↗
            </a>
            <a href="https://www.instagram.com/linuxid_/"
               target="_blank" rel="noreferrer"
               className="about__sidebar-link">
              IG ↗
            </a>
          </motion.div>
        </aside>

        {/* ── RIGHT: content ── */}
        <div className="about__content">

          {/* Pull quote */}
          <motion.blockquote
            className="about__pull-quote"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0.15}
          >
            "Crafting digital experiences that feel tangible — one component at a time."
          </motion.blockquote>

          {/* Prose paragraphs */}
          <motion.div
            className="about__prose"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0.25}
          >
            <p>
              I'm a dedicated Computer Science undergraduate at NSS College of Engineering
              with an 8.5 CGPA and a genuine passion for building interfaces that are as
              thoughtful as they are functional. My coursework has given me a solid grounding
              in Java, Python, and C++, alongside web technologies like HTML, CSS, and
              JavaScript.
            </p>
            <p>
              My practical work spans collaborative projects — from building the Solasta
              tech-fest platform to designing static sites for schools. I bring strong
              problem-solving instincts, an eye for detail, and the kind of curiosity that
              keeps me reaching for the terminal long after the workday ends.
            </p>
            <p>
              I'm a quick learner who thrives in teams, adapts to new challenges fast, and
              is always looking for the next thing to build. Currently open to freelance work
              and internship opportunities.
            </p>
          </motion.div>

          {/* Terminal skills block */}
          <motion.div
            className="about__terminal"
            ref={skillsRef}
            initial="hidden"
            animate={skillsView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0.1}
          >
            <div className="about__terminal-chrome">
              <span className="chrome-dot chrome-dot--red"   />
              <span className="chrome-dot chrome-dot--amber" />
              <span className="chrome-dot chrome-dot--green" />
              <span className="chrome-dot chrome-dot--label">skills.sh</span>
            </div>
            <div className="about__terminal-body">
              <p className="about__terminal-line">
                <span className="t-prompt">~$</span>{' '}
                <span className="t-cmd">cat languages.txt</span>
              </p>
              <p className="about__terminal-output">
                {LANGUAGES.map((l, i) => (
                  <span key={l} className="t-item t-item--blue">
                    {l}{i < LANGUAGES.length - 1 ? ',  ' : ''}
                  </span>
                ))}
              </p>
              <p className="about__terminal-line" style={{ marginTop: '0.75rem' }}>
                <span className="t-prompt">~$</span>{' '}
                <span className="t-cmd">cat tools.txt</span>
              </p>
              <p className="about__terminal-output">
                {TOOLS.map((t, i) => (
                  <span key={t} className="t-item t-item--green">
                    {t}{i < TOOLS.length - 1 ? ',  ' : ''}
                  </span>
                ))}
              </p>
              <p className="about__terminal-line" style={{ marginTop: '0.75rem' }}>
                <span className="t-prompt">~$</span>{' '}
                <span className="t-cmd">whoami</span>
              </p>
              <p className="about__terminal-output">
                <span className="t-item t-item--amber">athul</span>
                <span className="about__terminal-cursor">▋</span>
              </p>
            </div>
          </motion.div>

          {/* Experience timeline */}
          <div className="about__timeline" ref={timelineRef}>
            <p className="about__eyebrow" style={{ marginBottom: 'var(--s3)' }}>
              // experience
            </p>
            {EXPERIENCE.map(({ year, role, place, desc }, i) => (
              <motion.div
                key={i}
                className="about__timeline-item"
                initial="hidden"
                animate={timelineView ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i * 0.12}
              >
                <div className="about__timeline-left">
                  <span className="about__timeline-year">{year}</span>
                  <div className="about__timeline-dot" />
                  {i < EXPERIENCE.length - 1 && (
                    <div className="about__timeline-rule" />
                  )}
                </div>
                <div className="about__timeline-right">
                  <p className="about__timeline-role">{role}</p>
                  <p className="about__timeline-place">{place}</p>
                  <p className="about__timeline-desc">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>{/* end .about__content */}
      </div>{/* end .about__body */}
    </div>
  );
};

export default About;