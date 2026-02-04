import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './GlassButton.scss';

const GlassButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '', 
  onClick,
  href,
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  const buttonClass = `glass-button glass-button--${variant} glass-button--${size} ${className}`;

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      className={buttonClass}
      onClick={handleClick}
      href={href}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <span className="glass-button__content">{children}</span>
      
      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="glass-button__ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      
      {/* Glow effect */}
      <span className="glass-button__glow" />
    </MotionComponent>
  );
};

export default GlassButton;
