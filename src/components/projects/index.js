import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import AnimatedLetters from '../AnimattedLetters';
import GlassCard from '../ui/GlassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import TargetCursor from '../ui/TargetCursor';
import './index.scss';

const Projects = () => {
    const [letterClass, setLetterClass] = useState('text_animate');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const titleArray = ['M', 'y', ' ', 'W', 'o', 'r', 'k'];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Fetch and parse CSV data
        fetch('/data.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setProjects(results.data);
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error('Error parsing CSV:', error);
                        setLoading(false);
                    }
                });
            })
            .catch(error => {
                console.error('Error loading CSV:', error);
                setLoading(false);
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <>
            <TargetCursor
                spinDuration={5}
                hideDefaultCursor
                parallaxOn
                hoverDuration={0.2}
            />
            <div className='container projects-page'>
                <div className='projects-header'>
                    <h1>
                        <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={11} />
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className='projects-subtitle'
                    >
                        Crafted experiences that blend creativity with technology
                    </motion.p>
                </div>

                {loading ? (
                    <div className='loading-container'>
                        <motion.div
                            className='loading-spinner'
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>
                ) : (
                    <motion.div
                        className='projects-grid'
                        variants={containerVariants}
                        initial='hidden'
                        animate='visible'
                    >
                        {projects.map((project, index) => (
                            <motion.div key={index} variants={cardVariants}>
                                <GlassCard className='project-card cursor-target' blur='md' opacity='medium'>
                                    {project.image && (
                                        <div className='project-image'>
                                            <img 
                                                src={project.image} 
                                                alt={project.title}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className='project-content'>
                                        <h3 className='project-title'>{project.title}</h3>
                                        <p className='project-description'>{project.description}</p>
                                        
                                        {project.technologies && (
                                            <div className='project-tech'>
                                                {project.technologies.split(',').map((tech, i) => (
                                                    <span key={i} className='tech-tag cursor-target'>
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {project.link && (
                                            <div className='project-links'>
                                                <a 
                                                    href={project.link} 
                                                    target='_blank' 
                                                    rel='noreferrer'
                                                    className='project-link cursor-target'
                                                >
                                                    <FontAwesomeIcon icon={faCode} />
                                                    <span>View Code</span>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default Projects;
