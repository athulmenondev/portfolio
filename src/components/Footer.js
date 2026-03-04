const Footer = ({ data }) => {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">athul<span>.</span>dev</div>
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Socials</h4>
            <ul>
              <li><a href="https://github.com/athulmenondev" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/athul-s-menon-a22857296/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/linuxid_/" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Menu</h4>
            <ul>
              <li><a href="#work">Work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:athulmenon@gmail.com">Email Me</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="fb-left">
          {data.name} <span className="fb-divider">|</span> All rights reserved.
        </div>
        <div className="fb-center" dangerouslySetInnerHTML={{ __html: data.builtWith }}></div>
        <div className="fb-right" dangerouslySetInnerHTML={{ __html: data.location }}></div>
      </div>
    </footer>
  );
};

export default Footer;
