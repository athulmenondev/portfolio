import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './TargetCursor.scss';

const TargetCursor = ({
    spinDuration = 5,
    hideDefaultCursor = true,
    parallaxOn = true,
    hoverDuration = 0.2
}) => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', moveCursor);

        // Target elements with cursor-target class
        const targets = document.querySelectorAll('.cursor-target');
        targets.forEach(target => {
            target.addEventListener('mouseenter', handleMouseEnter);
            target.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            targets.forEach(target => {
                target.removeEventListener('mouseenter', handleMouseEnter);
                target.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            ref={cursorRef}
            className={`target-cursor ${hideDefaultCursor ? 'hide-default-cursor' : ''}`}
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            {/* Outer spinning ring */}
            <motion.div
                className="target-ring"
                animate={{ rotate: 360 }}
                transition={{
                    duration: spinDuration,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            >
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                    {/* Target crosshairs */}
                    <line x1="25" y1="5" x2="25" y2="15" stroke="currentColor" strokeWidth="2" />
                    <line x1="25" y1="35" x2="25" y2="45" stroke="currentColor" strokeWidth="2" />
                    <line x1="5" y1="25" x2="15" y2="25" stroke="currentColor" strokeWidth="2" />
                    <line x1="35" y1="25" x2="45" y2="25" stroke="currentColor" strokeWidth="2" />
                </svg>
            </motion.div>

            {/* Center dot */}
            <motion.div
                className="target-dot"
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    duration: hoverDuration,
                    ease: 'easeOut'
                }}
            />
        </motion.div>
    );
};

export default TargetCursor;
