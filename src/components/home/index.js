import './index.scss'
import logo from '../../assets/img/logo.svg'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import AnimatedLetters from '../AnimattedLetters';

const Home=()=>{
    const [letterClass, setLetterClass] = useState('text_animate');
    const nameArray = ['I', 'N', 'U', 'X', 'I', 'D']
    const jobArray = [
      'w',
      'e',
      'b',
      ' ',
      'd',
      'e',
      'v',
      'e',
      'l',
      'o',
      'p',
      'e',
      'r',
      '.',
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
        setLetterClass('text-animate-hover');
        }, 4000);

        return ()=>{
        clearTimeout(timer);
        }
    }, []);

    return (
        <div className='container home-page'>
            <div className='text-zone' >
                <h1>
                    <span className={`${letterClass} ${letterClass}_11`}>H</span>
                    <span className={`${letterClass} ${letterClass}_12`}>i,</span>
                    <br />
                    <span className={`${letterClass} ${letterClass}_13`}>I</span>
                    <span className={`${letterClass} ${letterClass}_14`}>'m</span>
                    <span> &nbsp; </span>
                    <img src={logo} alt='developer'/>
                    <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15}/>
                    <br/>
                    <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={22} />
                </h1>
                <h2>FrontEnd developer</h2>
                <Link to=' /contact' className='flat-button' >Contact Me</Link>
            </div>
        </div>
    );
}
export default Home;