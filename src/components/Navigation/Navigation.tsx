import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import logo from 'assets/pokeball.png';

import { logoutFromApp } from 'api/auth';
import { AppRoutes } from '../../utils/routes';

// import { logoutFromFirebase } from 'api/auth';

// TODO: prevent admin from accessing pages other than admin page???
export const Navigation: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const onLogoutHandler = async () => {
    // const { error } = await logoutFromApp();

    // if (error) {
    //   console.log(error.code);
    //   return;
    // }

    // navigate(AppRoutes.Login);
  };

  return (
    <div>
      <nav
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex' }}>
          <Link to={AppRoutes.Gallery}>Gallery</Link>
          <Link to={AppRoutes.Portfolio}>Portfolio</Link>
          <Link to={AppRoutes.Profile}>Profile</Link>
        </div>
        <button onClick={onLogoutHandler}>Logout</button>
      </nav>
    </div>
  );
};
