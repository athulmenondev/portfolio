import './index.scss';
import AnimatedLetters from '../AnimattedLetters';
import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCss3, faGit, faHtml5, faLinux, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
// import { faGift } from '@fortawesome/free-solid-svg-icons';

const About = ()=>{
    const [letterClass, setLetterClass] = useState('text_animate');
        const wordArray_1 = ['A','b','o','u','t'];
        const wordArray_2 = ['M','e'];
        useEffect(() => {
                const timer = setTimeout(() => {
                setLetterClass('text-animate-hover');
                }, 2000);
        
                return ()=>{
                clearTimeout(timer);
                }
            }, []);
    return (
        <div className='container about-page'>
            <div className='text-zone'>
                <h1 >
                    <AnimatedLetters letterClass={`${letterClass}`} strArray={wordArray_1} idx={11}/> &nbsp;
                    <AnimatedLetters letterClass={`${letterClass}`} strArray={wordArray_2} idx={16} />
                 </h1>

                 <p>
                    I am a dedicated Computer Science undergraduate at NSS College of Engineering 
                    with a strong academic background and an 8.5 CGPA. My coursework has provided 
                    me with a solid foundation in programming languages such as Java, Python, and 
                    C++, as well as web technologies like HTML, CSS, and JavaScript.
                 </p>
                 <p>My practical experience includes collaborating with a team to design and develop 
                    a static website for the National Higher Secondary School. In this project, I 
                    utilized HTML, CSS, and JavaScript to deliver a user-friendly interface and ensure 
                    information was easily accessible.</p>
                 <p>When hired, I will apply my strong problem-solving, teamwork, and communication 
                    skills to contribute effectively to your organization's goals. I am a quick and 
                    eager learner, ready to adapt to new challenges and technologies to help drive 
                    successful outcomes.
                </p>
            </div>
            <div className='stage-cube-cont'>
                <div className='cube-spinner'>
                    <div className='face1'>
                        <FontAwesomeIcon icon={faHtml5} color='#FF0000'/>
                    </div>
                    <div className='face2'>
                        <FontAwesomeIcon icon={faCss3} color='#FF0000'/>
                    </div>
                    <div className='face3'>
                        <FontAwesomeIcon icon={faReact} color='#FF0000'/>
                    </div>
                    <div className='face4'>
                        <FontAwesomeIcon icon={faLinux} color='#FF0000'/>
                    </div>
                    <div className='face5'>
                        <FontAwesomeIcon icon={faGit} color='#FF0000'/>
                    </div>
                    <div className='face6'>
                        <FontAwesomeIcon icon={faPython} color='#FF0000'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;