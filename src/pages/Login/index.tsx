import { AuthForm } from 'components/AuthForm/AuthForm';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  return <AuthForm isLoginForm />;
};
