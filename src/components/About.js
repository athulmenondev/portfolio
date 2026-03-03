const About = ({ data }) => {
  return (
    <section id="about">
      <div className="about-left">
        <div className="profile-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="profile-avatar" style={{ border: 'none' }}>
            <img src="/athulsmenon.jpg" alt="Athul Menon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="profile-name">{data.profile.name}</div>
          <div className="profile-handle">{data.profile.handle}</div>
          <div className="status-row">
            <div className="status-dot"></div>
            {data.profile.status}
          </div>
          <p className="profile-bio">{data.profile.bio}</p>
        </div>

        <div className="info-list">
          {data.info.map((item, i) => (
            <div key={i} className="info-item">
              <span className="info-key">{item.key}</span>
              <span className="info-val" dangerouslySetInnerHTML={{ __html: item.val }}></span>
            </div>
          ))}
        </div>
      </div>

      <div className="about-right">
        <div className="section-eyebrow">{data.eyebrow}</div>
        <blockquote className="about-quote reveal">
          {data.quote}
        </blockquote>

        <div className="about-body-row">
          <div className="about-text-col">
            {data.paragraphs.map((p, i) => (
              <p key={i} className="about-text reveal" dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
          </div>
          <div className="about-cube-col reveal d2">
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
          </div>
        </div>

        <div className="skills-terminal reveal" style={{ marginTop: 'var(--s4)' }}>
          <div className="st-bar">
            <div className="dot red"></div>
            <div className="dot amber"></div>
            <div className="dot green"></div>
            <span className="st-title">{data.skills.title}</span>
          </div>
          <div className="st-body">
            {data.skills.lines.map((line, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <div className="st-line">
                  <span className="prompt">$</span> 
                  <span className="st-cmd" dangerouslySetInnerHTML={{ __html: line.cmd }}></span> 
                </div>
                <div className="st-line">
                  <span className="st-output">{line.out}</span>
                </div>
                {i < data.skills.lines.length - 1 && <div className="st-divider"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* <div style={{ marginTop: 'var(--s5)' }}>
          <div className="section-eyebrow" style={{ marginBottom: 'var(--s3)' }}>Experience</div>
          <div className="timeline">
            {data.experience.map((exp, i) => (
              <div key={i} className={`tl-item ${exp.active ? 'active' : ''}`}>
                <div className="tl-dot"></div>
                {i < data.experience.length - 1 && <div className="tl-line"></div>}
                <div className="tl-date" dangerouslySetInnerHTML={{ __html: exp.date }}></div>
                <div>
                  <div className="tl-role">{exp.role}</div>
                  <div className="tl-company">{exp.company}</div>
                  <div className="tl-desc">{exp.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default About;