// ─── src/styles/Cursor.js ────────────────────────────────────────────────────

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const squareRef  = useRef(null);
  const hlineRef   = useRef(null);
  const vlineRef   = useRef(null);
  const posRef     = useRef({ x: 0, y: 0 });

  const isMobile = useMemo(() => {
    const hasTouch   = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmall    = window.innerWidth <= 768;
    const mobileUA   = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    return (hasTouch && isSmall) || mobileUA.test(navigator.userAgent.toLowerCase());
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Hide native cursor
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'cursor-none-global';
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `;
    document.head.appendChild(style);

    const sq = squareRef.current;
    const hl = hlineRef.current;
    const vl = vlineRef.current;

    // Place square at center on mount
    gsap.set(sq, {
      x: window.innerWidth  / 2,
      y: window.innerHeight / 2,
      xPercent: -50,
      yPercent: -50,
    });

    // ── Mouse move ──────────────────────────────
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      posRef.current = { x, y };

      // Square follows exactly (no lag per spec)
      gsap.set(sq, { x, y });

      // Crosshair lines track mouse
      gsap.set(hl, { y });
      gsap.set(vl, { x });
    };

    // ── Hover state (links + buttons) ───────────
    const onEnter = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]');
      if (!el) return;

      gsap.to(sq, {
        scale: 1.8,
        backgroundColor: 'rgba(91, 138, 240, 0.2)', // --accent at 20%
        duration: 0.15,
        ease: 'power2.out',
      });
      gsap.to([hl, vl], {
        opacity: 0.8,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onLeave = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]');
      if (!el) return;

      gsap.to(sq, {
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.15,
        ease: 'power2.out',
      });
      gsap.to([hl, vl], {
        opacity: 0.4,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    // ── Mouse down / up ─────────────────────────
    const onDown = () => {
      gsap.to(sq, { scale: 0.7, duration: 0.15, ease: 'power2.out' });
    };
    const onUp = () => {
      gsap.to(sq, { scale: 1,   duration: 0.2,  ease: 'power2.out' });
    };

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mouseover',  onEnter, { passive: true });
    window.addEventListener('mouseout',   onLeave, { passive: true });
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseover',  onEnter);
      window.removeEventListener('mouseout',   onLeave);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      document.body.style.cursor = '';
      document.getElementById('cursor-none-global')?.remove();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* ── Full-viewport horizontal crosshair line ── */}
      <div
        ref={hlineRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '100vw',
          height:          '1px',
          background:      'var(--accent)',
          opacity:         0.4,
          pointerEvents:   'none',
          zIndex:          9998,
          transform:       'translateY(0px)',
          willChange:      'transform',
          transition:      'opacity 0.15s ease',
        }}
      />

      {/* ── Full-viewport vertical crosshair line ── */}
      <div
        ref={vlineRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '1px',
          height:          '100vh',
          background:      'var(--accent)',
          opacity:         0.4,
          pointerEvents:   'none',
          zIndex:          9998,
          transform:       'translateX(0px)',
          willChange:      'transform',
          transition:      'opacity 0.15s ease',
        }}
      />

      {/* ── 10×10 hollow square ── */}
      <div
        ref={squareRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           10,
          height:          10,
          border:          '1.5px solid var(--accent)',
          borderRadius:    0,
          background:      'transparent',
          pointerEvents:   'none',
          zIndex:          9999,
          willChange:      'transform',
          transition:      'background 0.15s ease',
        }}
      />
    </>
  );
};

export default Cursor;