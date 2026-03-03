import { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
      if (onComplete) onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`loader ${done ? 'done' : ''}`} id="loader">
      <div className="loader-terminal">
        <div className="loader-line">$ ssh athul@portfolio.dev</div>
        <div className="loader-line">{`> Authenticating...`}</div>
        <div className="loader-line">{`> Connected. Loading workspace`}<span className="loader-cursor-blink">▋</span></div>
        <div className="loader-line">{`> Welcome back.`}</div>
      </div>
      <div className="loader-bar-wrap"><div className="loader-bar"></div></div>
    </div>
  );
};

export default Loader;
