import { useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Preload } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   NODE NETWORK  – cryptographic graph in 3D
───────────────────────────────────────────── */
function NodeNetwork({ mouse }) {
  const groupRef = useRef();
  const { size } = useThree();

  /* build a stable geometry once */
  const { nodePositions, edgePositions } = useMemo(() => {
    const NODE_COUNT = 28;
    const SPREAD = 3.2;
    const MAX_DIST = 2.2;

    const pts = Array.from({ length: NODE_COUNT }, () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * SPREAD * 2,
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * SPREAD
      )
    );

    const edgePts = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < MAX_DIST) {
          edgePts.push(pts[i].x, pts[i].y, pts[i].z);
          edgePts.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    return { nodePositions: pts, edgePositions: new Float32Array(edgePts) };
  }, []);

  /* edge geometry */
  const edgeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
    return g;
  }, [edgePositions]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    /* subtle auto-rotation */
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.x = t * 0.025;

    /* mouse tilt — clamped so it doesn't flip */
    const targetX = -(mouse.current.y / (size.height / 2)) * 0.35;
    const targetY =  (mouse.current.x / (size.width  / 2)) * 0.35;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* edges */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial
          color="#6B4CFF"
          transparent
          opacity={0.22}
          linewidth={1}
        />
      </lineSegments>

      {/* nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial
            color={i % 5 === 0 ? '#10B981' : i % 3 === 0 ? '#6B4CFF' : '#8B8BFF'}
            emissive={i % 5 === 0 ? '#10B981' : '#6B4CFF'}
            emissiveIntensity={1.4}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* accent large node (key/lock motif) */}
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.45, 1]} />
          <meshStandardMaterial
            color="#6B4CFF"
            emissive="#3B1FBF"
            emissiveIntensity={0.8}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* inner solid core */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial
            color="#4B2FEF"
            emissive="#6B4CFF"
            emissiveIntensity={1.2}
            roughness={0.05}
            metalness={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ─────────────────────────────────────────────
   SCENE – lights + network inside Canvas
───────────────────────────────────────────── */
function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} color="#6B4CFF" intensity={6} distance={12} />
      <pointLight position={[-4, -2, 2]} color="#10B981" intensity={3} distance={10} />
      <pointLight position={[0, 0, 5]}  color="#ffffff" intensity={0.4} />
      <NodeNetwork mouse={mouse} />
      <Preload all />
    </>
  );
}

/* ─────────────────────────────────────────────
   GLITCH TEXT HOOK  (GSAP-driven)
───────────────────────────────────────────── */
const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#__ABCDEFabcdef0123456789';

function useGlitchTypewriter(ref, lines, delay = 0.4) {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const ctx = gsap.context(() => {}, el);
    let disposed = false;

    const scramble = (target, finalText, duration, onDone) => {
      const totalFrames = Math.floor(duration * 60);
      let frame = 0;
      const tick = () => {
        if (disposed) return;
        const progress = frame / totalFrames;
        const revealedCount = Math.floor(progress * finalText.length);
        const scrambled = finalText
          .split('')
          .map((ch, i) =>
            i < revealedCount
              ? ch
              : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          )
          .join('');
        target.textContent = scrambled;
        frame++;
        if (frame <= totalFrames) requestAnimationFrame(tick);
        else { target.textContent = finalText; onDone?.(); }
      };
      tick();
    };

    /* stagger lines */
    let accDelay = delay * 1000;
    lines.forEach((line, i) => {
      setTimeout(() => {
        if (disposed || !el.children[i]) return;
        scramble(el.children[i], line, 0.9 + i * 0.15);
      }, accDelay);
      accDelay += 600 + line.length * 14;
    });

    return () => { disposed = true; ctx.revert(); };
  }, [ref, lines, delay]);
}

/* ─────────────────────────────────────────────
   HERO  – main export
───────────────────────────────────────────── */
const Hero = ({ data }) => {
  const mouse = useRef({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const glitchRef = useRef(null);

  /* text lines for the glitch effect (preserve existing data) */
  const glitchLines = [
    '> Hi, I am athulmenondev.',
    '> Computer Science Student & Developer.',
    '> Building the web, one commit at a time.',
  ];
  useGlitchTypewriter(glitchRef, glitchLines, 0.9);

  /* track mouse for 3D tilt */
  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* parallax on scroll for text */
  useEffect(() => {
    const handleScroll = () => {
      const t = sectionRef.current?.querySelector('.hero-title');
      const s = sectionRef.current?.querySelector('.hero-tagline');
      if (t) t.style.transform = `translateY(${window.scrollY * 0.12}px)`;
      if (s) s.style.transform = `translateY(${window.scrollY * 0.07}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* magnetic button */
  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.2;
    const y = (e.clientY - r.top - r.height / 2) * 0.2;
    e.currentTarget.style.transform = `translate(${x}px,${y}px)`;
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section id="hero" ref={sectionRef} className="relative w-full overflow-hidden">

      {/* ── 3D canvas background ── */}
      <div
        className="hero-canvas-wrap"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* scanline overlay */}
        <div className="hero-scanlines" />
        {/* radial vignette */}
        <div className="hero-vignette" />

        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <Scene mouse={mouse} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── main two-column layout (kept 100% compatible with existing CSS) ── */}
      <div className="hero-inner-grid">

        {/* LEFT: text */}
        <div className="hero-left" style={{ position: 'relative', zIndex: 2 }}>

          {/* glitch terminal overlay */}
          <div className="hero-glitch-block" ref={glitchRef} aria-label="Hero intro text">
            <span className="hero-glitch-line">{''}</span>
            <span className="hero-glitch-line">{''}</span>
            <span className="hero-glitch-line">{''}</span>
          </div>

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
            {data.buttons.map((btn, i) =>
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
                  {btn.target === 'contact' && <ArrowUpRight size={16} style={{ marginLeft: 4 }} />}
                </a>
              )
            )}
          </div>

          <div className="hero-stack reveal d2">
            <span className="hero-stack-label">Stack:</span>
            {data.stack.map((item, i) => (
              <span key={i} className="stack-badge">{item}</span>
            ))}
          </div>
        </div>

        {/* RIGHT: code window kept, but floated on top of canvas */}
        <div className="hero-right" style={{ position: 'relative', zIndex: 2 }}>
          <div className="code-window">
            <div className="window-bar">
              <div className="dot red" />
              <div className="dot amber" />
              <div className="dot green" />
              <span className="window-title">{data.codeWindow.title}</span>
            </div>
            <div className="code-body" id="codeBlock">
              {data.codeWindow.lines.map((line, i) => {
                if (line.includes('//'))           return <div key={i}><span className="ln">{i+1}</span><span className="c-cm">{line}</span></div>;
                if (line.includes('const Athul'))  return <div key={i}><span className="ln">{i+1}</span><span className="c-k">const</span> <span className="c-f">Athul</span> <span className="c-p">=</span> <span className="c-k">()</span> <span className="c-p">=&gt;</span> <span className="c-p">{'{'}</span></div>;
                if (line.includes('return'))       return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;<span className="c-k">return</span> <span className="c-p">(</span></div>;
                if (line.includes('<Developer'))   return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-p">&lt;</span><span className="c-cl">Developer</span></div>;
                if (line.includes('role='))        return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-pr">role</span><span className="c-p">=</span><span className="c-s">"{line.split('"')[1]}"</span></div>;
                if (line.includes('based='))       return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-pr">based</span><span className="c-p">=</span><span className="c-s">"{line.split('"')[1]}"</span></div>;
                if (line.includes('loves='))       return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-pr">loves</span><span className="c-p">=</span><span className="c-s">"{line.split('"')[1]}"</span></div>;
                if (line.includes('open='))        return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-pr">open</span><span className="c-p">=</span><span className="c-s">"{line.split('"')[1]}"</span></div>;
                if (line.includes('/>'))           return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-p">/&gt;</span></div>;
                if (line.includes('  );'))         return <div key={i}><span className="ln">{i+1}</span>&nbsp;&nbsp;<span className="c-p">);</span></div>;
                if (line.includes('};'))           return <div key={i}><span className="ln">{i+1}</span><span className="c-p">{'};'}</span></div>;
                if (line.includes('export default')) return <div key={i}><span className="ln">{i+1}</span><span className="c-k">export default</span> <span className="c-f">Athul</span><span className="c-p">;</span><span className="type-cursor" /></div>;
                return <div key={i}><span className="ln">{i+1}</span>{line}</div>;
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
