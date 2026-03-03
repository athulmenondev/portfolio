import { Code2, PenTool, Zap } from 'lucide-react';

const ICONS = {
  'Code2': <Code2 size={24} />,
  'PenTool': <PenTool size={24} />,
  'Zap': <Zap size={24} />
};

const Services = ({ data }) => {
  return (
    <div className="section-wrap" id="services">
      <div className="section-top">
        <div>
          <div className="section-eyebrow">{data.eyebrow}</div>
          <h2 className="section-heading reveal" dangerouslySetInnerHTML={{ __html: data.heading }}></h2>
        </div>
      </div>
      <div className="services-grid">
        {data.items.map((item, i) => (
          <div key={i} className={`service-card reveal ${i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : ''}`}>
             <div className="service-icon">
                {ICONS[item.icon] || item.icon}
             </div>
             <h3 className="service-title">{item.title}</h3>
             <p className="service-desc">{item.desc}</p>
             <ul className="service-skills">
               {item.skills.map((skill, j) => (
                 <li key={j}>{skill}</li>
               ))}
             </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
