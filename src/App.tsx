import { Link, Outlet } from 'react-router-dom';
import { AppRoutes } from './utils/routes';

import './App.css';

export const App: React.FC = () => {
  return (
    <div className="app">
      <nav className="app-nav">
        <Link to={AppRoutes.Gallery}>Gallery</Link>
        <Link to={AppRoutes.Portfolio}>Portfolio</Link>
        <Link to={AppRoutes.Profile}>Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
};
