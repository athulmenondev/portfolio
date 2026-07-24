import { useEffect, useState } from 'react';

const GITHUB_USER = 'athulmenondev';
const CACHE_KEY = 'gh_contributions';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const LEGEND = ['#1a1f2e', '#1c3461', '#1d4ed8', '#3b82f6', '#60a5fa'];
const LEVELS  = [0, 0, 0, 1, 1, 1, 2, 2, 3, 4];

/* ── GraphQL query ─────────────────────────────────────── */
const QUERY = `{
  user(login: "${GITHUB_USER}") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

/* ── Fetch real contribution data ──────────────────────── */
async function fetchContributions() {
  // Check cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) return data;
    }
  } catch { /* ignore */ }

  const token = process.env.REACT_APP_GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY }),
    });

    if (!res.ok) return null;

    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    // Flatten all days
    const allDays = cal.weeks.flatMap(w => w.contributionDays);

    // Cache result
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: allDays, ts: Date.now() }));
    } catch { /* ignore */ }

    return allDays;
  } catch {
    return null;
  }
}

/* ── Mock data generator (fallback) ────────────────────── */
function generateMockHeatmap() {
  const cells = [];
  const today = new Date();
  for (let w = 0; w < 52; w++) {
    for (let d = 0; d < 7; d++) {
      const l = Math.random() < 0.35 ? 0 : LEVELS[Math.floor(Math.random() * LEVELS.length)];
      cells.push({ level: l, isToday: false });
    }
  }
  return cells;
}

function generateMockWeekly() {
  const labels = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'];
  return labels.map((label, i) => {
    const recency = (i + 1) / labels.length;
    const base = Math.random() * 0.6 + recency * 0.4;
    const level = base < 0.15 ? 0 : base < 0.35 ? 1 : base < 0.55 ? 2 : base < 0.78 ? 3 : 4;
    const count = level === 0 ? 0 : Math.floor(Math.random() * 8 * level) + level;
    return { label, level, count };
  });
}

/* ── Convert real calendar data to heatmap levels ───────── */
function calendarToHeatmap(calendarDays) {
  if (!calendarDays?.length) return generateMockHeatmap();

  // Find max contributions for level mapping
  const maxCount = Math.max(...calendarDays.map(d => d.contributionCount), 1);
  const today = new Date().toISOString().slice(0, 10);

  // Pad to fill 52×7 grid (start from the Monday 51 weeks ago)
  const start = new Date();
  start.setDate(start.getDate() - (52 * 7 - 1));
  start.setDate(start.getDate() - start.getDay()); // align to Sunday

  const dayMap = {};
  calendarDays.forEach(d => { dayMap[d.date] = d.contributionCount; });

  const cells = [];
  for (let i = 0; i < 52 * 7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const count = dayMap[dateStr] ?? 0;

    let level;
    if (count === 0) level = 0;
    else if (count <= maxCount * 0.25) level = 1;
    else if (count <= maxCount * 0.5) level = 2;
    else if (count <= maxCount * 0.75) level = 3;
    else level = 4;

    cells.push({ level, isToday: dateStr === today });
  }

  return cells;
}

/* ── Convert real calendar data to weekly bars ──────────── */
function calendarToWeekly(calendarDays) {
  if (!calendarDays?.length) return generateMockWeekly();

  // Group by ISO week
  const weekMap = {};
  calendarDays.forEach(d => {
    const date = new Date(d.date);
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNum = Math.ceil(((date - yearStart) / 86400000 + yearStart.getDay() + 1) / 7);
    const key = `${date.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
    if (!weekMap[key]) weekMap[key] = { count: 0, label: '' };
    weekMap[key].count += d.contributionCount;
  });

  // Take the most recent 12 weeks
  const sorted = Object.entries(weekMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-12);

  const maxCount = Math.max(...sorted.map(([, w]) => w.count), 1);

  return sorted.map(([key, w], i) => {
    const level =
      w.count === 0 ? 0 :
      w.count <= maxCount * 0.25 ? 1 :
      w.count <= maxCount * 0.5 ? 2 :
      w.count <= maxCount * 0.75 ? 3 : 4;

    return {
      label: `W${i + 1}`,
      level,
      count: w.count,
    };
  });
}

/* ═════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
const Activity = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [heatmapCells, setHeatmapCells] = useState(() => generateMockHeatmap());
  const [weeklyData, setWeeklyData] = useState(() => generateMockWeekly());
  const [totalContributions, setTotalContributions] = useState(null);
  const [isRealData, setIsRealData] = useState(false);

  // ── Detect mobile ──
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Fetch real data on mount ──
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const calendarDays = await fetchContributions();
      if (cancelled || !calendarDays) return;

      setHeatmapCells(calendarToHeatmap(calendarDays));
      setWeeklyData(calendarToWeekly(calendarDays));
      setTotalContributions(calendarDays.reduce((s, d) => s + d.contributionCount, 0));
      setIsRealData(true);
    })();

    return () => { cancelled = true; };
  }, []);

  // Max count for bar height scaling
  const maxCount = Math.max(...weeklyData.map(w => w.count), 1);

  const heading = data.heading || 'Shipping <em style="font-style:italic;color:var(--ink-muted)">daily.</em>';
  const link = data.link || { url: 'https://github.com/athulmenondev', label: 'github.com/athulmenondev ↗' };
  const stats = data.stats || [
    { num: '150+', label: 'Contributions' },
    { num: '20', label: 'Repos' },
    { num: '1 month', label: 'of Experience as an Intern' },
  ];

  // Override first stat with real total if available
  const displayStats = stats.map((s, i) =>
    i === 0 && totalContributions != null
      ? { ...s, num: `${totalContributions}+` }
      : s
  );

  return (
    <div className="section-wrap" id="activity">
      {/* Header */}
      <div className="section-top">
        <div>
          <div className="section-eyebrow">{data.eyebrow}</div>
          <h2
            className="section-heading"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>
        <a className="section-link" href={link.url} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      </div>

      {/* Body */}
      <div className="activity-body">

        {/* ── Desktop: full heatmap ── */}
        {!isMobile && (
          <div className="heatmap-panel">
            <div className="hm-grid">
              {heatmapCells.map((cell, i) => (
                <div
                  key={i}
                  className={`hm-cell${cell.level > 0 ? ' l' + cell.level : ''}${cell.isToday ? ' hm-today' : ''}`}
                />
              ))}
            </div>
            <div className="heatmap-legend">
              <span>Less</span>
              {LEGEND.map((bg, i) => (
                <div key={i} className="legend-cell" style={{ background: bg }} />
              ))}
              <span>More</span>
            </div>
          </div>
        )}

        {/* ── Mobile: terminal bar chart ── */}
        {isMobile && (
          <div className="act-bars">
            <div className="act-bars-header">
              <span className="act-bars-title">weekly_activity.log</span>
              <span className="act-bars-total">
                {totalContributions != null ? `${totalContributions} contributions` : 'fetching...'}
              </span>
            </div>
            <div className="act-bars-chart">
              {weeklyData.map((week, i) => (
                <div key={i} className="act-bar-col">
                  <span className="act-bar-count">{week.count || ''}</span>
                  <div className="act-bar-track">
                    <div
                      className={`act-bar-fill l${week.level}`}
                      style={{ height: week.count ? `${Math.max((week.count / maxCount) * 100, 8)}%` : '0%' }}
                    />
                  </div>
                  <span className="act-bar-label">{week.label}</span>
                </div>
              ))}
            </div>
            <div className="act-bars-legend">
              <span>Less</span>
              {LEGEND.map((bg, i) => (
                <div key={i} className="legend-cell" style={{ background: bg }} />
              ))}
              <span>More</span>
            </div>
          </div>
        )}

        {/* Stats + Focus */}
        <div className="activity-right">
          <div className="activity-stats">
            {displayStats.map((s, i) => (
              <div
                key={i}
                className={`act-stat${displayStats.length % 2 !== 0 && i === displayStats.length - 1 ? ' full' : ''}`}
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
