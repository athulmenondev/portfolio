// ─── src/components/contact/index.js ─────────────────────────────────────────

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './index.scss';

// ── Social rows ───────────────────────────────────────────────────────────────
const SOCIALS = [
  { label: 'GitHub',    handle: '@athulmenondev',          href: 'https://github.com/athulmenondev' },
  { label: 'LinkedIn',  handle: 'athul-s-menon-a22857296', href: 'https://www.linkedin.com/in/athul-s-menon-a22857296/' },
  { label: 'Instagram', handle: '@linuxid_',               href: 'https://www.instagram.com/linuxid_/' },
];

// ── Fade-up variant ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: d },
  }),
};

// ── Component ─────────────────────────────────────────────────────────────────
const Contact = () => {
  const [formData,   setFormData]   = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error

  const headerRef  = useRef(null);
  const contentRef = useRef(null);
  const headerInView  = useInView(headerRef,  { once: true });
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    // EmailJS placeholder — configure with credentials when ready
    setTimeout(() => {
      console.log('Form data:', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const btnLabel = {
    idle:    'send_message() →',
    sending: 'sending...',
    success: '✓ message_sent()',
    error:   'error — try_again()',
  }[formStatus];

  return (
    <div className="contact">

      {/* ── Header ── */}
      <div className="contact__header" ref={headerRef}>
        <motion.p className="contact__eyebrow"
          initial="hidden" animate="visible" variants={fadeUp} custom={0.1}>
          // get in touch
        </motion.p>

        <motion.h1 className="contact__title"
          initial="hidden" animate="visible" variants={fadeUp} custom={0.2}>
          Let's <em>Talk.</em>
        </motion.h1>

        {/* Pseudo-code tagline */}
        <motion.p className="contact__pseudocode"
          initial="hidden" animate="visible" variants={fadeUp} custom={0.35}>
          <span className="syn-function">sendEmail</span>
          <span className="syn-property">(</span>
          <span className="syn-string">"your new project"</span>
          <span className="syn-property">)</span>
          <span className="syn-comment"> // let's collaborate</span>
        </motion.p>
      </div>

      {/* ── Body grid ── */}
      <div className="contact__body" ref={contentRef}>

        {/* ── LEFT: form ── */}
        <motion.div className="contact__form-col"
          initial="hidden" animate={contentInView ? 'visible' : 'hidden'}
          variants={fadeUp} custom={0.1}>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className="contact__field">
              <label className="contact__label" htmlFor="name">
                <span className="contact__label-key">name</span>
                <span className="contact__label-sep">:</span>
              </label>
              <input
                id="name" name="name" type="text"
                value={formData.name} onChange={handleChange}
                required autoComplete="name"
                className="contact__input"
                placeholder="Athul Menon"
              />
            </div>

            {/* Email */}
            <div className="contact__field">
              <label className="contact__label" htmlFor="email">
                <span className="contact__label-key">email</span>
                <span className="contact__label-sep">:</span>
              </label>
              <input
                id="email" name="email" type="email"
                value={formData.email} onChange={handleChange}
                required autoComplete="email"
                className="contact__input"
                placeholder="you@example.com"
              />
            </div>

            {/* Subject */}
            <div className="contact__field">
              <label className="contact__label" htmlFor="subject">
                <span className="contact__label-key">subject</span>
                <span className="contact__label-sep">:</span>
              </label>
              <input
                id="subject" name="subject" type="text"
                value={formData.subject} onChange={handleChange}
                required
                className="contact__input"
                placeholder="New project idea"
              />
            </div>

            {/* Message */}
            <div className="contact__field contact__field--textarea">
              <label className="contact__label" htmlFor="message">
                <span className="contact__label-key">message</span>
                <span className="contact__label-sep">:</span>
              </label>
              <textarea
                id="message" name="message"
                value={formData.message} onChange={handleChange}
                required rows={6}
                className="contact__input contact__textarea"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className={`contact__submit contact__submit--${formStatus}`}
              disabled={formStatus === 'sending'}
            >
              {btnLabel}
            </button>
          </form>
        </motion.div>

        {/* ── RIGHT: info panel ── */}
        <motion.div className="contact__info-col"
          initial="hidden" animate={contentInView ? 'visible' : 'hidden'}
          variants={fadeUp} custom={0.25}>

          {/* Availability badge */}
          <div className="contact__availability">
            <span className="contact__status-dot" />
            <span className="contact__status-text">available for opportunities</span>
          </div>

          {/* Info rows */}
          <div className="contact__info-block">
            <div className="contact__info-row">
              <span className="contact__info-key">email</span>
              <span className="contact__info-sep">:</span>
              <a href="mailto:athulmenon@example.com"
                 className="contact__info-val contact__info-val--link">
                athulmenon@example.com
              </a>
            </div>
            <div className="contact__info-row">
              <span className="contact__info-key">location</span>
              <span className="contact__info-sep">:</span>
              <span className="contact__info-val">Kerala, India</span>
            </div>
            <div className="contact__info-row">
              <span className="contact__info-key">timezone</span>
              <span className="contact__info-sep">:</span>
              <span className="contact__info-val">IST (UTC +5:30)</span>
            </div>
            <div className="contact__info-row">
              <span className="contact__info-key">response</span>
              <span className="contact__info-sep">:</span>
              <span className="contact__info-val">within 24h</span>
            </div>
          </div>

          {/* Social links — bordered rows with ↗ */}
          <div className="contact__socials">
            <p className="contact__socials-label">// connect</p>
            {SOCIALS.map(({ label, handle, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="contact__social-row"
              >
                <span className="contact__social-label">{label}</span>
                <span className="contact__social-handle">{handle}</span>
                <span className="contact__social-arrow">↗</span>
              </a>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Contact;