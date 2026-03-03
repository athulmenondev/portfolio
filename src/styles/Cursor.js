// ─── src/styles/Cursor.js ────────────────────────────────────────────────────

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const squareRef = useRef(null);
  const hlineRef  = useRef(null);
  const vlineRef  = useRef(null);
  const posRef    = useRef({ x: 0, y: 0 });

  const isMobile = useMemo(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmall  = window.innerWidth <= 768;
    const mobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    return (hasTouch && isSmall) || mobileUA.test(navigator.userAgent.toLowerCase());
  }, []);

  useEffect(() => {
    if (isMobile) return;

    document.body.style.cursor = 'none';

    const sq = squareRef.current;
    const hl = hlineRef.current;
    const vl = vlineRef.current;

    // Initial position (center)
    gsap.set(sq, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      xPercent: -50,
      yPercent: -50,
    });

    // ── Mouse Move ─────────────────────────────
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      posRef.current = { x, y };

      // Square follows exactly
      gsap.set(sq, { x, y });

      // Lines track axis
      gsap.set(hl, { y });
      gsap.set(vl, { x });
    };

    // ── Hover State ────────────────────────────
    const onEnter = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]');
      if (!el) return;

      sq.classList.add('active');
      hl.classList.add('active');
      vl.classList.add('active');
    };

    const onLeave = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]');
      if (!el) return;

      sq.classList.remove('active');
      hl.classList.remove('active');
      vl.classList.remove('active');
    };

    // ── Click Animation ────────────────────────
    const onDown = () => {
      sq.classList.add('click');
    };

    const onUp = () => {
      sq.classList.remove('click');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onEnter, { passive: true });
    window.addEventListener('mouseout',  onLeave, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout',  onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.body.style.cursor = '';
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={hlineRef}  className="cursor-hline" />
      <div ref={vlineRef}  className="cursor-vline" />
      <div ref={squareRef} className="cursor-square" />
    </>
  );
};

export default Cursor;