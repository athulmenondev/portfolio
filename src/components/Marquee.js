const Marquee = ({ data }) => {
  const full = [...data, ...data, ...data, ...data];
  return (
    <div className="marquee-strip">
      <div className="marquee-inner" id="marqInner">
        {full.map((item, i) => (
          <span key={i} className={`marquee-item${item === '✦' ? ' sep' : ''}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
