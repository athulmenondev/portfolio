import { ArrowUpRight } from 'lucide-react';

const Contact = ({ data }) => {
  return (
    <section id="contact" style={{ textAlign: 'center', padding: 'var(--s8) var(--s5)', borderTop: '1px solid var(--rule)' }}>
      <div className="reveal">
        <h2 className="contact-heading" dangerouslySetInnerHTML={{ __html: data.heading }}></h2>
        <p className="contact-sub" style={{ margin: 'var(--s5) auto', maxWidth: '600px', fontSize: '1rem' }}>
          <span className="c-comment">{data.sub.comment1}</span><br />
          <span className="c-fn" dangerouslySetInnerHTML={{ __html: data.sub.func }}></span><br />
          <span className="c-comment">{data.sub.comment2}</span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: 'var(--s5)' }}>
          <a className="btn-primary" href={`mailto:${data.email}`} style={{ textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '100px', fontSize: '1.2rem' }}>
            {data.email} <ArrowUpRight size={20} style={{ marginLeft: 6, display: 'inline' }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
