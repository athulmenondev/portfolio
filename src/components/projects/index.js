// ─── src/components/projects/index.js ────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './index.scss';

// ── Tag color by technology ───────────────────────────────────────────────────
const techColor = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react') || t.includes('next') || t.includes('node')) return 'blue';
  if (t.includes('python') || t.includes('linux') || t.includes('git'))  return 'green';
  if (t.includes('html') || t.includes('css') || t.includes('javascript')) return 'amber';
  return 'blue';
};

// ── Loading skeleton ──────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="projects__skeleton">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="projects__skeleton-card" />
    ))}
  </div>
);

// ── Project card ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const tags   = project.technologies
    ? project.technologies.split(',').map((t) => t.trim())
    : [];
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      ref={ref}
      className="projects__card"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.1,
      }}
    >
      {/* Faint index number */}
      <span className="projects__card-num" aria-hidden="true">{num}</span>

      {/* Image */}
      {project.image && (
        <div className="projects__card-img-wrap">
          <img
            src={`${process.env.PUBLIC_URL}${project.image}`}
            alt={project.title}
            className="projects__card-img"
            loading="lazy"
            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
          />
        </div>
      )}

      {/* Content */}
      <div className="projects__card-body">
        <h3 className="projects__card-title">{project.title}</h3>
        <p className="projects__card-desc">{project.description}</p>

        {/* Tech tags */}
        {tags.length > 0 && (
          <div className="projects__card-tags">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`projects__tag projects__tag--${techColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="projects__card-links">
          {project.linkdemo && (
            <a
              href={project.linkdemo}
              target="_blank"
              rel="noreferrer"
              className="projects__btn-primary"
            >
              Live ↗
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="projects__btn-ghost"
            >
              Code →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch((err) => { console.error('Error loading data:', err); setLoading(false); });
  }, []);

  return (
    <div className="projects">

      {/* ── Header ── */}
      <div className="projects__header" ref={headerRef}>
        <motion.p
          className="projects__eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* my work */}
        </motion.p>

        <motion.h1
          className="projects__title"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Selected <em>Projects</em>
        </motion.h1>

        <motion.p
          className="projects__subtitle"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.75, delay: 0.4 }}
        >
          Crafted experiences that blend creativity with technology
        </motion.p>

        {/* Stats bar */}
        <motion.div
          className="projects__stats"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <div className="projects__stat">
            <span className="projects__stat-num">{projects.length || '—'}</span>
            <span className="projects__stat-label">projects</span>
          </div>
          <div className="projects__stat-divider" />
          <div className="projects__stat">
            <span className="projects__stat-num">
              {projects.filter(p => p.linkdemo).length || '—'}
            </span>
            <span className="projects__stat-label">live</span>
          </div>
          <div className="projects__stat-divider" />
          <div className="projects__stat">
            <span className="projects__stat-num">
              {projects.filter(p => p.link).length || '—'}
            </span>
            <span className="projects__stat-label">open source</span>
          </div>
        </motion.div>
      </div>

      {/* ── Grid ── */}
      <div className="projects__body">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="projects__grid">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Projects;