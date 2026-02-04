import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faBriefcase, faEnvelope, faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './MobileMenu.scss';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        closed: {
            x: '-100%',
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        },
        open: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        }
    };

    const backdropVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    const linkVariants = {
        closed: { x: -20, opacity: 0 },
        open: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.3
            }
        })
    };

    const navItems = [
        { path: '/', icon: faHouse, label: 'Home' },
        { path: '/about', icon: faUser, label: 'About' },
        { path: '/projects', icon: faBriefcase, label: 'Projects' },
        { path: '/contact', icon: faEnvelope, label: 'Contact' }
    ];

    return (
        <>
            {/* Hamburger Button */}
            <motion.button
                className='mobile-menu-button'
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
                animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </motion.button>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className='mobile-menu-backdrop'
                        variants={backdropVariants}
                        initial='closed'
                        animate='open'
                        exit='closed'
                        onClick={toggleMenu}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className='mobile-menu-panel'
                        variants={menuVariants}
                        initial='closed'
                        animate='open'
                        exit='closed'
                    >
                        <button className='close-button' onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>

                        <nav className='mobile-nav'>
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.path}
                                    custom={i}
                                    variants={linkVariants}
                                    initial='closed'
                                    animate='open'
                                >
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => 
                                            `mobile-nav-link ${isActive ? 'active' : ''}`
                                        }
                                        onClick={toggleMenu}
                                    >
                                        <FontAwesomeIcon icon={item.icon} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileMenu;
