import { useEffect, useRef } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital@0;1&family=DM+Sans:wght@400;600;700&display=swap');

  .activity-section {
    width: 100%;
    padding: 3rem 0;
    font-family: 'DM Sans', sans-serif;
    box-sizing: border-box;
  }

  /* ── Header ── */
  .activity-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .activity-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent, #5b8def);
    margin-bottom: 0.35rem;
  }

  .activity-heading {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    color: var(--ink, #e8e8e8);
    margin: 0;
    line-height: 1.2;
  }

  .activity-link {
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    color: var(--accent, #5b8def);
    text-decoration: none;
    border: 1px solid var(--accent, #5b8def);
    padding: 0.4rem 0.9rem;
    border-radius: 4px;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.18s, color 0.18s;
  }
  .activity-link:hover {
    background: var(--accent, #5b8def);
    color: #fff;
  }

  /* ── Body ── */
  .activity-body {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
  }

  /* Left: heatmap fills remaining space */
  .heatmap-panel {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* The actual heatmap: 52 columns of 7 square cells each */
  .hm-grid {
    display: flex;
    flex-direction: row;
    gap: 3px;
    width: 100%;
  }

  .hm-col {
    flex: 1 1 0;           /* each column takes equal width */
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  /* Square cells using padding-top trick */
  .hm-cell {
    width: 100%;
    padding-top: 100%;     /* makes height == width → perfect square */
    border-radius: 2px;
    background: var(--hm-0, #1a1f2e);
    transition: opacity 0.12s;
    cursor: default;
    position: relative;
  }
  .hm-cell:hover { opacity: 0.7; }
  .hm-cell.l1 { background: #1c3461; }
  .hm-cell.l2 { background: #1d4ed8; }
  .hm-cell.l3 { background: #3b82f6; }
  .hm-cell.l4 { background: #60a5fa; }

  /* Legend */
  .heatmap-legend {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: flex-end;
  }
  .heatmap-legend span {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    color: var(--ink-muted, #555e72);
  }
  .legend-cell {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* Right panel */
  .activity-right {
    flex: 0 0 260px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .activity-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--rule, #252b3b);
    border: 1px solid var(--rule, #252b3b);
    border-radius: 8px;
    overflow: hidden;
  }

  .act-stat {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 1rem 1.1rem;
    background: var(--bg-2, #10141f);
  }

  /* Stat spanning full width (odd one out) */
  .act-stat.full {
    grid-column: 1 / -1;
    border-top: 1px solid var(--rule, #252b3b);
  }

  .act-stat-num {
    font-size: 1.55rem;
    font-weight: 700;
    color: var(--ink, #e8e8e8);
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .act-stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    color: var(--ink-muted, #555e72);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .activity-focus {
    padding: 1.1rem 1.2rem;
    background: var(--bg-2, #10141f);
    border: 1px solid var(--rule, #252b3b);
    border-radius: 8px;
  }

  .focus-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    color: var(--accent, #5b8def);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.55rem;
  }

  .focus-text {
    font-size: 0.8rem;
    color: var(--ink-muted, #555e72);
    line-height: 1.65;
    margin: 0;
  }

  /* ── Mobile ── */
  @media (max-width: 700px) {
    .activity-top {
      flex-direction: column;
      align-items: flex-start;
    }
    .activity-body {
      flex-direction: column;
    }
    .activity-right {
      flex: none;
      width: 100%;
    }
  }
`;

const LEGEND = ['#1a1f2e', '#1c3461', '#1d4ed8', '#3b82f6', '#60a5fa'];
const LEVELS  = [0, 0, 0, 1, 1, 1, 2, 2, 3, 4];

const Activity = ({ data = {
  eyebrow: 'Github Activity',
  heading: 'Shipping <em>daily.</em>',
  link: { url: 'https://github.com', label: 'github.com/athuulmenondev ↗' },
  stats: [
    { num: '150+', label: 'Contributions' },
    { num: '17',   label: 'Repos' },
    { num: '3',    label: 'Experience yrs' },
  ]
} }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const hm = gridRef.current;
    if (!hm) return;
    hm.innerHTML = '';
    for (let w = 0; w < 52; w++) {
      const col = document.createElement('div');
      col.className = 'hm-col';
      for (let d = 0; d < 7; d++) {
        const cell = document.createElement('div');
        const l = Math.random() < 0.35 ? 0 : LEVELS[Math.floor(Math.random() * LEVELS.length)];
        cell.className = `hm-cell${l > 0 ? ' l' + l : ''}`;
        col.appendChild(cell);
      }
      hm.appendChild(col);
    }
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="activity-section" id="activity">

        {/* Header */}
        <div className="activity-top">
          <div>
            <div className="activity-eyebrow">{data.eyebrow}</div>
            <h2
              className="activity-heading"
              dangerouslySetInnerHTML={{ __html: data.heading }}
            />
          </div>
          <a className="activity-link" href={data.link.url} target="_blank" rel="noreferrer">
            {data.link.label}
          </a>
        </div>

        {/* Body */}
        <div className="activity-body">

          {/* Heatmap */}
          <div className="heatmap-panel">
            <div className="hm-grid" ref={gridRef} />
            <div className="heatmap-legend">
              <span>Less</span>
              {LEGEND.map((bg, i) => (
                <div key={i} className="legend-cell" style={{ background: bg }} />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Stats + Focus */}
          <div className="activity-right">
            <div className="activity-stats">
              {data.stats.map((s, i) => (
                <div
                  key={i}
                  className={`act-stat${data.stats.length % 2 !== 0 && i === data.stats.length - 1 ? ' full' : ''}`}
                >
                  <span className="act-stat-num">{s.num}</span>
                  <span className="act-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="activity-focus">
              <div className="focus-label">Current Focus</div>
              <p className="focus-text">
                Deep diving into scalable UI architectures, experimenting with
                cutting‑edge CSS, and pushing code daily to maintain an unbroken streak.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Activity;