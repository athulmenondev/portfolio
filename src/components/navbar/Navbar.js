import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import Logo from '../../assets/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSquareLinkedin, faSquareGithub, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
    return (
        <div className="top-navbar">
            <div className="navbar-content">
                <NavLink className='navbar-logo' to="/">
                    <img src={Logo} alt='Logo' />
                </NavLink>
                
                <nav className="navbar-links">
                    <NavLink exact="true" to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                        <FontAwesomeIcon icon={faHouse} />
                        <span>Home</span>
                    </NavLink>
                    <NavLink exact="true" to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                        <FontAwesomeIcon icon={faUser} />
                        <span>About</span>
                    </NavLink>
                    <NavLink exact="true" to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
                        <FontAwesomeIcon icon={faBriefcase} />
                        <span>Projects</span>
                    </NavLink>
                    <NavLink exact="true" to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>Contact</span>
                    </NavLink>
                </nav>

                <div className="navbar-social">
                    <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/athul-s-menon-a22857296/'>
                        <FontAwesomeIcon icon={faSquareLinkedin} />
                    </a>
                    <a target='_blank' rel="noreferrer" href='https://github.com/athulmenondev'>
                        <FontAwesomeIcon icon={faSquareGithub} />
                    </a>
                    <a target='_blank' rel="noreferrer" href='https://www.instagram.com/linuxid_/'>
                        <FontAwesomeIcon icon={faSquareInstagram} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
