import { signUpForApp } from 'api/auth';
import { AuthLayout } from 'components/Auth/AuthLayout';
import { AppRoutes } from 'utils/routes';

export interface SignUpPageProps {}

export const SignUpPage: React.FC<SignUpPageProps> = () => {
  return (
    <AuthLayout
      pageText="Sign Up"
      redirectText="Login"
      redirectRoute={AppRoutes.Login}
      authFn={signUpForApp}
    />
  );
};
