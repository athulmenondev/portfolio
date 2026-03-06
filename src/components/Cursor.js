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
    let animationFrameId;

    // 2. High-performance mouse tracking (avoiding React state)
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
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
          backgroundColor: 'rgba(16, 185, 129, 0.18)', // Custom semi-transparent neon green fill
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
      document.body.style.cursor = 'auto'; // Restore default
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
      /* Outer wrapper controls translation to avoid conflict with GSAP scaling */
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={innerRef}
        /* Inner div centers itself natively via top/left offsets and handles the aesthetic */
        className="absolute top-[-10px] left-[-10px] w-5 h-5 border-[1.5px] border-[#10B981] rounded-[3px]"
      />
    </div>
  );
};

export default Cursor;
