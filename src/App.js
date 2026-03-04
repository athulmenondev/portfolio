import { useEffect, useState } from 'react';
import Lenis from 'lenis';

import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Activity from './components/Activity';
import Work from './components/Work';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    if (!data) return;

    // Initialize smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initialize scroll reveal observer
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => { 
        if (e.isIntersecting) e.target.classList.add('in-view'); 
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
    }, 100);

    return () => {
      lenis.destroy();
      ro.disconnect();
    };
  }, [data]);

  const handleLoaderComplete = () => {
    document.body.classList.add('loaded');
  };

  if (!data) return null;

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />
      <Cursor />
      <Nav data={data.nav} />
      <Hero data={data.hero} />
      <Marquee data={data.marquee} />
      <Activity data={data.activity} />
      <Work data={data.work} />
      <Services data={data.services} />
      <About data={data.about} />
      <Contact data={data.contact} />
      <Footer data={data.footer} />
    </>
  );
}

export default App;