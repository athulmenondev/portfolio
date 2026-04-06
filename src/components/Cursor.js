import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // 1. Detect touch devices and exit early so we don't render or track
    if (typeof window !== 'undefined') {
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      setIsTouchDevice(isTouch);
      if (isTouch) return;
    }

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    /* Current represents the interpolated position for smooth trailing */
    let currentX = mouseX;
    let currentY = mouseY;
    let hasMoved = false;
    let animationFrameId;

    // Hide until first mouse move to avoid flash at (0,0)
    outer.style.opacity = '0';

    // 2. High-performance mouse tracking (avoiding React state)
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        // Snap to exact position on first move, then let lerp take over
        currentX = mouseX;
        currentY = mouseY;
        outer.style.opacity = '1';
      }
    };

    // 3. requestAnimationFrame loop
    const render = () => {
      // Smooth lerp (interpolation) towards the actual mouse position
      currentX += (mouseX - currentX) * 0.4;
      currentY += (mouseY - currentY) * 0.4;

      // We only translate the outer wrapper, leaving the inner wrapper purely for GSAP scaling
      outer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      animationFrameId = requestAnimationFrame(render);
    };

    // 4. Attach GSAP hover effects via event delegation for maximum efficiency
    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .hover-target')) {
        gsap.to(inner, {
          scale: 1.5,
          backgroundColor: 'rgba(16, 185, 129, 0.18)',
          duration: 0.35,
          ease: 'power3.out',
        });
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .hover-target')) {
        gsap.to(inner, {
          scale: 1,
          backgroundColor: 'transparent',
          duration: 0.35,
          ease: 'power3.out',
        });
      }
    };

    // Bind listeners
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    animationFrameId = requestAnimationFrame(render);

    // Hide default system cursor site-wide
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Return null entirely on mobile/touch devices
  if (isTouchDevice) return null;

  return (
    <div
      ref={outerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
        willChange: 'transform',
        opacity: 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          width: '20px',
          height: '20px',
          border: '1.5px solid #10B981',
          borderRadius: '3px',
        }}
      />
    </div>
  );
};

export default Cursor;
