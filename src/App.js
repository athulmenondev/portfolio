import { Route, Routes } from 'react-router-dom';
import './App.scss';
import 'animate.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layouts';
import Home from './components/home';
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';
import CustomCursor from './components/ui/CustomCursor';
import ThemeToggle from './components/ui/ThemeToggle';
import MobileMenu from './components/ui/MobileMenu';

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <ThemeToggle />
      <MobileMenu />
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path='about' element={<About/>}></Route>
          <Route path='projects' element={<Projects/>}></Route>
          <Route path='contact' element={<Contact/>}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
