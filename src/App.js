import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/layouts/index';
import Home from './components/home'
import 'animate.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
