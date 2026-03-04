import { ArrowUpRight, ArrowRight } from 'lucide-react';

const Work = ({ data }) => {
  const handleMouseMove = (e) => {
    const target = e.currentTarget;
    const r = target.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.2;
    const y = (e.clientY - r.top - r.height / 2) * 0.2;
    target.style.transform = `translate(${x}px,${y}px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <div className="section-wrap" id="work" style={{ paddingTop: 0 }}>
      <div className="section-top">
        <div>
          <div className="section-eyebrow">{data.eyebrow}</div>
          <h2 className="section-heading reveal">{data.heading}</h2>
        </div>
        <span className="section-link">{data.dateRange}</span>
      </div>

      <div className="proj-featured reveal">
        <div className="proj-featured-img">
          <div className="browser-mockup">
            <div className="browser-header">
              <span className="dot red"></span>
              <span className="dot amber"></span>
              <span className="dot green"></span>
              <span className="url">{data.featured.urlName}</span>
            </div>
            <div className="browser-body">
              <img src={data.featured.image} alt={data.featured.title} className="featured-image" />
            </div>
          </div>
        </div>

        <div className="proj-featured-body">
          <div>
            <div className="featured-label">{data.featured.label}</div>
            <h3 className="featured-title">{data.featured.title}</h3>
            <p className="featured-desc">{data.featured.desc}</p>
            <div className="featured-stats">
              {data.featured.stats.map((stat, i) => (
                <div key={i}>
                  <div className="feat-stat-num">{stat.num}</div>
                  <div className="feat-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="proj-tech-row" style={{ marginBottom: "var(--s3)" }}>
              {data.featured.tech.map((t, i) => <span key={i} className="proj-tech">{t}</span>)}
            </div>
          </div>
          <div className="featured-actions">
            {data.featured.links.map((link, i) => (
              <a 
                key={i} 
                className={`proj-link-btn ${link.primary ? 'primary-link' : ''}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {link.label.replace('↗', '').replace('→', '')}
                {link.label.includes('↗') ? <ArrowUpRight size={14} className="ml-1" /> : <ArrowRight size={14} className="ml-1" />}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="projects-list">
        {data.projects.map((proj, i) => (
          <div key={i} className={`proj-row reveal ${i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : ''}`}>
            <div className="proj-num">{proj.num}</div>
            <div className="proj-body">
              <div className="proj-meta-row">
                <span className={`proj-tag ${proj.tagColors}`}>{proj.tag}</span>
                <span className="proj-year">{proj.year}</span>
              </div>
              <h3 className="proj-title">{proj.title}</h3>
              <p className="proj-desc">{proj.desc}</p>
              <div className="proj-tech-row">
                {proj.tech.map((t, j) => <span key={j} className="proj-tech">{t}</span>)}
              </div>
            </div>
            <div className="proj-links">
              {proj.links.map((link, j) => (
                <a 
                  key={j} 
                  className={`proj-link-btn ${link.primary ? 'primary-link' : ''}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.label.replace('↗', '').replace('→', '')}
                  {link.label.includes('↗') ? <ArrowUpRight size={14} className="ml-1" /> : <ArrowRight size={14} className="ml-1" />}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
