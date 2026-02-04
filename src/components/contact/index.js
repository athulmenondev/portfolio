import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedLetters from '../AnimattedLetters';
import GlassCard from '../ui/GlassCard';
import GlassButton from '../ui/GlassButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './index.scss';

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text_animate');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

    const titleArray = ['C', 'o', 'n', 't', 'a', 'c', 't'];
    const subtitleArray = ['M', 'e'];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');

        // Since EmailJS requires setup, we'll just simulate success for now
        // You can configure EmailJS later with your credentials
        setTimeout(() => {
            console.log('Form data:', formData);
            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            setTimeout(() => {
                setFormStatus('idle');
            }, 3000);
        }, 1500);

        /* Uncomment and configure when ready to use EmailJS:
        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            formData,
            'YOUR_PUBLIC_KEY'
        )
        .then(() => {
            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 3000);
        })
        .catch((error) => {
            console.error('Email error:', error);
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 3000);
        });
        */
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        <div className='container contact-page'>
            <div className='contact-header'>
                <h1>
                    <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={11} />
                    &nbsp;
                    <AnimatedLetters letterClass={letterClass} strArray={subtitleArray} idx={18} />
                </h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className='contact-subtitle'
                >
                    Let's collaborate and bring your ideas to life
                </motion.p>
            </div>

            <motion.div
                className='contact-content'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
            >
                <motion.div className='contact-form-container' variants={itemVariants}>
                    <GlassCard className='contact-form-card' blur='lg' opacity='medium' animate={false}>
                        <form onSubmit={handleSubmit} className='contact-form'>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder=' '
                                    className='form-input'
                                />
                                <label className='form-label'>Your Name</label>
                            </div>

                            <div className='form-group'>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder=' '
                                    className='form-input'
                                />
                                <label className='form-label'>Your Email</label>
                            </div>

                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='subject'
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder=' '
                                    className='form-input'
                                />
                                <label className='form-label'>Subject</label>
                            </div>

                            <div className='form-group'>
                                <textarea
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder=' '
                                    className='form-input form-textarea'
                                    rows='6'
                                />
                                <label className='form-label'>Message</label>
                            </div>

                            <GlassButton
                                type='submit'
                                variant='primary'
                                size='lg'
                                className='submit-button'
                                disabled={formStatus === 'sending'}
                            >
                                {formStatus === 'sending' ? 'Sending...' :
                                 formStatus === 'success' ? '✓ Sent!' :
                                 formStatus === 'error' ? 'Error! Try Again' :
                                 'Send Message'}
                            </GlassButton>
                        </form>
                    </GlassCard>
                </motion.div>

                <motion.div className='contact-info-container' variants={itemVariants}>
                    <GlassCard className='contact-info-card' blur='md' opacity='light' animate={false}>
                        <div className='info-item'>
                            <div className='info-icon'>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className='info-content'>
                                <h3>Email</h3>
                                <p>athulmenon@example.com</p>
                            </div>
                        </div>

                        <div className='info-item'>
                            <div className='info-icon'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </div>
                            <div className='info-content'>
                                <h3>Location</h3>
                                <p>Kerala, India</p>
                            </div>
                        </div>

                        <div className='social-links'>
                            <h3>Connect With Me</h3>
                            <div className='social-icons'>
                                <a href='https://www.linkedin.com/in/athul-s-menon-a22857296/' target='_blank' rel='noreferrer'>
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                                <a href='https://github.com/athulmenondev' target='_blank' rel='noreferrer'>
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                                <a href='https://www.instagram.com/linuxid_/' target='_blank' rel='noreferrer'>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>
                        </div>
                    </GlassCard>

                    <motion.div
                        className='availability-badge'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
                    >
                        <span className='status-dot'></span>
                        Available for opportunities
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Contact;
