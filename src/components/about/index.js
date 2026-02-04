import './index.scss';
import AnimatedLetters from '../AnimattedLetters';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCss3, faGit, faHtml5, faLinux, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import GlassCard from '../ui/GlassCard';
import BlurText from '../ui/BlurText';

const About = () => {
    const [letterClass, setLetterClass] = useState('text_animate');
    const wordArray_1 = ['A','b','o','u','t'];
    const wordArray_2 = ['M','e'];
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className='container about-page'>
            <motion.div 
                className='text-zone'
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <GlassCard className="about-glass-card" blur="lg" opacity="medium" animate={false}>
                    <h1>
                        <AnimatedLetters letterClass={`${letterClass}`} strArray={wordArray_1} idx={11}/> &nbsp;
                        <AnimatedLetters letterClass={`${letterClass}`} strArray={wordArray_2} idx={16} />
                    </h1>

                    <BlurText
                        text="I am a dedicated Computer Science undergraduate at NSS College of Engineering with a strong academic background and an 8.5 CGPA. My coursework has provided me with a solid foundation in programming languages such as Java, Python, and C++, as well as web technologies like HTML, CSS, and JavaScript."
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="about-paragraph"
                    />
                    
                    <BlurText
                        text="My practical experience includes collaborating with a team to design and develop a static website for the National Higher Secondary School. In this project, I utilized HTML, CSS, and JavaScript to deliver a user-friendly interface and ensure information was easily accessible."
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="about-paragraph"
                    />
                    
                    <BlurText
                        text="When hired, I will apply my strong problem-solving, teamwork, and communication skills to contribute effectively to your organization's goals. I am a quick and eager learner, ready to adapt to new challenges and technologies to help drive successful outcomes."
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="about-paragraph"
                    />
                </GlassCard>
            </motion.div>
            
            <motion.div 
                className='stage-cube-cont'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <GlassCard className="cube-glass-wrapper" blur="md" opacity="subtle" animate={false}>
                    <div className='cube-spinner'>
                        <div className='face1'>
                            <FontAwesomeIcon icon={faHtml5} color='#E34F26'/>
                        </div>
                        <div className='face2'>
                            <FontAwesomeIcon icon={faCss3} color='#1572B6'/>
                        </div>
                        <div className='face3'>
                            <FontAwesomeIcon icon={faReact} color='#61DAFB'/>
                        </div>
                        <div className='face4'>
                            <FontAwesomeIcon icon={faLinux} color='#FCC624'/>
                        </div>
                        <div className='face5'>
                            <FontAwesomeIcon icon={faGit} color='#F05032'/>
                        </div>
                        <div className='face6'>
                            <FontAwesomeIcon icon={faPython} color='#3776AB'/>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default About;