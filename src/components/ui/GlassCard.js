import React from 'react';
import { motion } from 'framer-motion';
import './GlassCard.scss';

const GlassCard = ({ 
  children, 
  className = '', 
  blur = 'md', 
  opacity = 'medium',
  elevation = '2',
  animate = true,
  ...props 
}) => {
  const cardClass = `glass-card glass-card--blur-${blur} glass-card--opacity-${opacity} glass-card--elevation-${elevation} ${className}`;

  if (animate) {
    return (
      <motion.div 
        className={cardClass}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3 }
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
