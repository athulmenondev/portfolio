import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <div className="work-v2-outer section-wrap" id="work" style={{ paddingTop: 0 }}>
      <div className="work-v2-inner">
        {/* Header */}
        <div className="work-v2-hd reveal">
          <div>
            <div className="section-eyebrow">{data.eyebrow}</div>
            <h2 className="work-v2-heading">{data.heading}</h2>
          </div>
          <div className="work-v2-hd-right">
            <span className="section-link">{data.dateRange}</span>
            <span className="work-v2-count">[{data.projects.length + 1} Projects]</span>
          </div>
        </div>

        {/* Featured Card */}
        <div className="work-featured reveal" style={{ '--ac': data.featured.color || '#10B981' }}>
          <div className="work-feat-glow"></div>
          
          <div className="work-feat-img-wrap">
            <div className="work-feat-browser">
              <div className="work-feat-bar">
                <span className="dot red"></span>
                <span className="dot amber"></span>
                <span className="dot green"></span>
                <span className="work-feat-url">{data.featured.urlName}</span>
              </div>
              <div className="work-feat-screen">
                <img src={data.featured.image} alt={data.featured.title} className="work-feat-screenshot" />
              </div>
            </div>
          </div>

          <div className="work-feat-body">
            <div className="work-feat-left">
              <div className="work-feat-badge">
                {data.featured.year} <span className="work-feat-badge-tag">{data.featured.tag}</span>
              </div>
              <div>
                <h3 className="work-feat-title">{data.featured.title}</h3>
                {data.featured.role && <div className="work-feat-role">{data.featured.role}</div>}
              </div>
              <p className="work-feat-desc">{data.featured.longDesc || data.featured.desc}</p>
              
              {data.featured.highlights && (
                <ul className="work-feat-highlights">
                  {data.featured.highlights.map((hl, i) => (
                    <li key={i} className="work-feat-highlight-item">
                      <CheckCircle2 size={12} className="work-feat-hl-icon" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="work-feat-tags">
                {data.featured.tech.map((t, i) => <span key={i} className="work-feat-tech">{t}</span>)}
              </div>

              <div className="work-feat-actions">
                {data.featured.links.map((link, i) => (
                  <a 
                    key={i} 
                    className={`wfv2-btn ${link.primary ? 'wfv2-btn--fill' : 'wfv2-btn--ghost'}`}
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

            <div className="work-feat-stats">
              {data.featured.stats.map((stat, i) => (
                <div key={i} className="work-feat-stat">
                  <div className="work-feat-stat-num">{stat.num}</div>
                  <div className="work-feat-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="work-proj-grid">
          {data.projects.map((proj, i) => (
            <div key={i} className="work-proj-card reveal" style={{ '--ac': proj.color || '#6B4CFF' }}>
              <div className="work-proj-glow"></div>
              
              <div className="work-proj-img-wrap">
                {proj.image && <img src={proj.image} alt={proj.title} className="work-proj-img" />}
                <div className="work-proj-img-overlay"></div>
              </div>

              <div className="work-proj-body">
                <div className="work-proj-meta">
                  <span className="work-proj-tag">{proj.tag}</span>
                  <span className="work-proj-year">{proj.year}</span>
                  <span className="work-proj-num">{proj.num}</span>
                </div>
                
                <h3 className="work-proj-title">{proj.title}</h3>
                <p className="work-proj-desc">{proj.desc}</p>
                
                <div className="work-proj-tags">
                  {proj.tech.map((t, j) => <span key={j} className="work-proj-tech">{t}</span>)}
                </div>

                <div className="work-proj-links">
                  {proj.links.map((link, j) => (
                    <a 
                      key={j} 
                      className={`wfv2-btn ${link.primary ? 'wfv2-btn--fill' : 'wfv2-btn--ghost'}`}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;