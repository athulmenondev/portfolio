// ─── src/components/layouts/index.js ─────────────────────────────────────────

import { Outlet } from 'react-router-dom';
import Navbar from '../navbar';
import Sidebar from '../sidebar';
import './Layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;