import './index.scss';
import logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedLetters from '../AnimattedLetters';
import GlassCard from '../ui/GlassCard';
import GlassButton from '../ui/GlassButton';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text_animate');
    const nameArray = ['I', 'N', 'U', 'X', 'I', 'D'];
    const jobArray = [
        'w', 'e', 'b', ' ', 'd', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '.'
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className='container home-page'>
            <motion.div 
                className='text-zone'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <GlassCard 
                    className="hero-glass-card" 
                    blur="lg" 
                    opacity="light"
                    animate={false}
                >
                    <h1>
                        <span className={`${letterClass} ${letterClass}_11`}>H</span>
                        <span className={`${letterClass} ${letterClass}_12`}>i,</span>
                        <br />
                        <span className={`${letterClass} ${letterClass}_13`}>I</span>
                        <span className={`${letterClass} ${letterClass}_14`}>'m</span>
                        <span>&nbsp;&nbsp;</span>
                        <motion.img 
                            src={logo} 
                            alt='developer'
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                        />
                        <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15}/>
                        <br/>
                        <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={22} />
                    </h1>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                    >
                        FrontEnd Developer
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.5 }}
                    >
                        <Link to='/about'>
                            <GlassButton variant="primary" size="lg">
                                Explore My Work
                            </GlassButton>
                        </Link>
                    </motion.div>
                </GlassCard>
            </motion.div>

            {/* Floating elements for depth */}
            <motion.div 
                className="hero-decoration hero-decoration--1"
                animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            />
            <motion.div 
                className="hero-decoration hero-decoration--2"
                animate={{ 
                    y: [0, 30, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5
                }}
            />
        </div>
    );
};

export default Home;