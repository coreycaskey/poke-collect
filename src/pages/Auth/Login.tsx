import { loginToApp } from 'api/auth';
import { AuthLayout } from 'components/Auth/AuthLayout';
import { AppRoutes } from 'utils/routes';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <AuthLayout
      pageText="Login"
      redirectText="Sign Up"
      redirectRoute={AppRoutes.SignUp}
      authFn={loginToApp}
    />
  );
};
