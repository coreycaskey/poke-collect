import { Link, Outlet } from 'react-router-dom';

import './App.css';

export const App = () => {
  return (
    <div className="app">
      <nav className="app-nav">
        <Link to="/gallery">Gallery</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
};
