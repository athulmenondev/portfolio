import { useEffect } from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const Hero = ({ data }) => {
  useEffect(() => {
    const handleScroll = () => {
      const t = document.querySelector('.hero-title');
      const s = document.querySelector('.hero-tagline');
      if (t) t.style.transform = `translateY(${window.scrollY * 0.12}px)`;
      if (s) s.style.transform = `translateY(${window.scrollY * 0.07}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <section id="hero">
      <div className="hero-left">
        <div className="hero-terminal-badge">{data.badge}</div>

        <h1 className="hero-title">
          <span className="wr"><span className="wi">{data.titleParts[0]}</span></span><br />
          <span className="wr"><span className="wi accent-word">{data.titleParts[1]}</span></span><br />
          <span className="wr"><span className="wi">{data.titleParts[2]}</span></span><br />
          <span className="wr"><span className="wi"><em>{data.titleParts[3]}</em></span></span>
        </h1>

        <p className="hero-tagline reveal">
          <span className="c-comment">{data.tagline.comment}</span><br />
          <span className="c-key">const</span> stack = [<span className="c-s">"TypeScript"</span>, <span className="c-s">"Rust"</span>, <span className="c-s">"Python"</span>];<br />
          <span className="c-fn">buildThingsThat</span>(<span className="c-s">"scale"</span> + <span className="c-s">"delight"</span>);
        </p>

        <div className="hero-actions reveal">
          {data.buttons.map((btn, i) => (
            btn.primary ? (
              <button 
                key={i} 
                className="btn-primary" 
                onClick={() => document.getElementById(btn.target)?.scrollIntoView({ behavior: 'smooth' })}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <span>{btn.label}</span>
                {btn.target === 'work' ? <ChevronRight size={16} /> : <ArrowUpRight size={16} />}
              </button>
            ) : (
              <a 
                key={i} 
                className="btn-outline" 
                href={`#${btn.target}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <span>{btn.label}</span>
                {btn.target === 'contact' && <ArrowUpRight size={16} style={{ marginLeft: 4 }}/>}
              </a>
            )
          ))}
        </div>

        <div className="hero-stack reveal d2">
          <span className="hero-stack-label">Stack:</span>
          {data.stack.map((item, i) => (
            <span key={i} className="stack-badge">{item}</span>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <div className="code-window">
          <div className="window-bar">
            <div className="dot red"></div>
            <div className="dot amber"></div>
            <div className="dot green"></div>
            <span className="window-title">{data.codeWindow.title}</span>
          </div>
          <div className="code-body" id="codeBlock">
            {data.codeWindow.lines.map((line, i) => {
              if (line.includes('//')) return <div key={i}><span className="ln">{i+1}</span><span className="c-cm">{line}</span></div>;
              if (line.includes('const Athul')) return <div key={i}><span className="ln">{i+1}</span><span className="c-k">const</span> <span className="c-f">Athul</span> <span className="c-p">=</span> <span className="c-k">()</span> <span className="c-p">=&gt;</span> <span className="c-p">{'{'}</span></div>;
              if (line.includes('return')) return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;<span className="c-k">return</span> <span className="c-p">(</span></div>;
              if (line.includes('<Developer')) return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-p">&lt;</span><span className="c-cl">Developer</span></div>;
              if (line.includes('role=')) return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-pr">role</span><span className="c-p">=</span><span className="c-s">"{line.split('"')[1]}"</span></div>;
              if (line.includes('based=')) return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-pr">based</span><span className="c-p">=</span><span className="c-s">"{line.split('"')[1]}"</span></div>;
              if (line.includes('loves=')) return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-pr">loves</span><span className="c-p">=</span><span className="c-s">"{line.split('"')[1]}"</span></div>;
              if (line.includes('open=')) return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-pr">open</span><span className="c-p">=</span><span className="c-s">"{line.split('"')[1]}"</span></div>;
              if (line.includes('/>')) return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-p">/&gt;</span></div>;
              if (line.includes('  );')) return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;<span className="c-p">);</span></div>;
              if (line.includes('};')) return <div key={i}><span className="ln">{i+1}</span><span className="c-p">{'};'}</span></div>;
              if (line.includes('export default')) return <div key={i}><span className="ln">{i+1}</span><span className="c-k">export default</span> <span className="c-f">Athul</span><span className="c-p">;</span><span className="type-cursor"></span></div>;
              return <div key={i}><span className="ln">{i+1}</span>{line}</div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
