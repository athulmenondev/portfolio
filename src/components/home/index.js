import './index.scss'
import Logo from '../../assets/img/logo.svg'
import { Link } from 'react-router-dom';

const Home=()=>{
    return (
        <div className='container home-page'>
            <div className='text-zone' >
                <h1>Hi ,<br/> I am &nbsp;
                <img src={Logo} alt='developer'/>
                inuxid_
                <br/>
                Web Developer</h1>
                <h2>FrontEnd developer</h2>
                <Link to=' /contact' className='flat-button' >Contact Me</Link>
            </div>
        </div>
    );
}
export default Home;