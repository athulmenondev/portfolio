import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './BlurText.scss';

const BlurText = ({
    text,
    delay = 200,
    animateBy = 'words', // 'words' or 'characters'
    direction = 'top', // 'top', 'bottom', 'left', 'right'
    onAnimationComplete,
    className = ''
}) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const getDirectionOffset = () => {
        switch (direction) {
            case 'top':
                return { y: -20, x: 0 };
            case 'bottom':
                return { y: 20, x: 0 };
            case 'left':
                return { x: -20, y: 0 };
            case 'right':
                return { x: 20, y: 0 };
            default:
                return { y: -20, x: 0 };
        }
    };

    const offset = getDirectionOffset();

    const splitText = () => {
        if (animateBy === 'words') {
            return text.split(' ').map((word, idx) => ({ text: word, index: idx }));
        } else {
            return text.split('').map((char, idx) => ({ text: char, index: idx }));
        }
    };

    const items = splitText();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: delay / 1000,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            filter: 'blur(10px)',
            ...offset
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            className={`blur-text ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onAnimationComplete={onAnimationComplete}
        >
            {items.map((item, idx) => (
                <motion.span
                    key={idx}
                    variants={itemVariants}
                    className="blur-text-item"
                >
                    {item.text}
                    {animateBy === 'words' && idx < items.length - 1 ? '\u00A0' : ''}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default BlurText;
