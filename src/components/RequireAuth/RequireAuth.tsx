import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext, AuthContextType } from 'providers/AuthProvider';
import { AppRoutes } from 'utils/routes';
import { Loading } from 'components/Loading/Loading';

export const RequireAuth: React.FC = ({ children }) => {
  const { user, loading } = useContext<AuthContextType>(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={AppRoutes.Login} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
