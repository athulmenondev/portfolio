import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="theme-toggle__icon-wrapper"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <FontAwesomeIcon 
          icon={isDark ? faMoon : faSun} 
          className="theme-toggle__icon"
        />
      </motion.div>
      
      {/* Liquid morph background */}
      <motion.div
        className="theme-toggle__background"
        animate={{
          scale: isTransitioning ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
