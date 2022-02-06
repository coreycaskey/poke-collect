import { Loading } from 'components/Loading/Loading';
import { AuthContext, AuthContextType } from 'providers/AuthProvider';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from 'utils/routes';

export const RequireAdminAuth: React.FC = ({ children }) => {
  const { user, loading, isAdmin } = useContext<AuthContextType>(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={AppRoutes.Login} state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={AppRoutes.Error} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
