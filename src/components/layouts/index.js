import './index.scss';
import Sidebar from '../sidebar/index'
import { Outlet } from 'react-router-dom';

const Layout=()=>{
    return (
        <div className='App'>
            <Sidebar/>
            <div className='page'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;