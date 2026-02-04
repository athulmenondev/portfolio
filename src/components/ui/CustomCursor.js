import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.scss';

const CustomCursor = () => {
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smooth trailing
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        setCursorVariant('link');
      } else if (target.closest('.project-card') || target.closest('.glass-card')) {
        setCursorVariant('card');
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant('default');
    };

    // Mouse move listener
    window.addEventListener('mousemove', moveCursor);

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .glass-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: 'rgba(150, 100, 255, 0.5)',
      border: '2px solid rgba(150, 100, 255, 0.8)',
    },
    link: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(150, 100, 255, 0.1)',
      border: '2px solid rgba(150, 100, 255, 1)',
    },
    card: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(100, 150, 255, 0.05)',
      border: '2px solid rgba(100, 150, 255, 0.8)',
    },
  };

  return (
    <motion.div
      className="custom-cursor hide-mobile"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={cursorVariant}
      variants={variants}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    />
  );
};

export default CustomCursor;
