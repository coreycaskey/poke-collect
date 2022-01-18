import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../utils/routes';

// import { logoutFromFirebase } from 'api/auth';

import styles from './Navigation.module.css';

// TODO: prevent admin from accessing pages other than admin page???
export const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    // const { error: logoutError } = await logoutFromFirebase();

    // if (logoutError) {
    //   // TODO: show some modal
    //   console.log(logoutError.message);
    // } else {
    //   // auth observer will update session and state variables

    //   // avoid adding to history stack -- prevent backtracking to protected page
    //   navigate(AppRoutes.Login, { replace: true });
    // }
  };

  return (
    <div className={styles.app}>
      <nav className={styles['app-nav']} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <Link to={AppRoutes.Gallery}>Gallery</Link>
          <Link to={AppRoutes.Portfolio}>Portfolio</Link>
          <Link to={AppRoutes.Profile}>Profile</Link>
        </div>
        <button onClick={logoutHandler}>Logout</button>
      </nav>
    </div>
  );
};
