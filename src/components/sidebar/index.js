import { Link, NavLink } from 'react-router-dom';
import './index.scss';
import Logo from '../../assets/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faUser,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faSquareLinkedin,faSquareGithub,faSquareInstagram} from '@fortawesome/free-brands-svg-icons';


const Sidebar=()=>{
    return (
        <div className='nav-bar'>
            <Link className='logo' to="/">
                <img src={Logo} alt='' />

            </Link>
            <nav>
                <NavLink exact="true" activeclassname="active" to="/">
                    <FontAwesomeIcon icon={faHouse}  color='#141B41'/>
                </NavLink>
                <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                    <FontAwesomeIcon icon={faUser} color='#141B41'/>
                </NavLink>
                <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                    <FontAwesomeIcon icon={faEnvelope} color='#141B41'/>
                </NavLink>
            </nav>
            <ul>
                <li>
                    <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/athul-s-menon-a22857296/'>
                        <FontAwesomeIcon icon={faSquareLinkedin} />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel="noreferrer" href='https://github.com/athulmenondev'>
                        <FontAwesomeIcon icon={faSquareGithub} />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel="noreferrer" href='https://www.instagram.com/linuxid_/'>
                        <FontAwesomeIcon icon={faSquareInstagram} />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;