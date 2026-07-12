import { useEffect, useRef } from 'react';

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
    <div className="section-wrap" id="activity">
      {/* Header */}
      <div className="section-top">
        <div>
          <div className="section-eyebrow">{data.eyebrow}</div>
          <h2
            className="section-heading"
            dangerouslySetInnerHTML={{ __html: data.heading }}
          />
        </div>
        <a className="section-link" href={data.link.url} target="_blank" rel="noreferrer">
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
  );
};

export default Activity;
