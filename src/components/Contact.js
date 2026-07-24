import { ArrowUpRight } from 'lucide-react';

const Contact = ({ data }) => {
  return (
    <section id="contact">
      <div className="contact-inner reveal">
        <h2 className="contact-heading" dangerouslySetInnerHTML={{ __html: data.heading }}></h2>
        <p className="contact-sub">
          <span className="c-comment">{data.sub.comment1}</span><br />
          <span className="c-fn" dangerouslySetInnerHTML={{ __html: data.sub.func }}></span><br />
          <span className="c-comment">{data.sub.comment2}</span>
        </p>
        <div className="contact-actions">
          <a className="btn-primary contact-email" href={`mailto:${data.email}`}>
            {data.email} <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
