import { Alert, Card, Layout } from 'antd';
import { Loading } from 'components/Loading/Loading';
import { AuthReturnType } from 'types/auth';
import { AppRoutes } from 'utils/routes';
import { AuthForm } from './AuthForm';
import { useAuthPage } from 'pages/Auth/hooks/useAuthPage';

const { Content } = Layout;

export interface AuthLayoutProps {
  pageText: string;
  redirectText: string;
  redirectRoute: AppRoutes;
  authFn: (email: string, password: string) => Promise<AuthReturnType>;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  pageText,
  redirectText,
  redirectRoute,
  authFn,
}) => {
  const {
    setUser,
    email,
    setEmail,
    password,
    setPassword,
    errorMsg,
    setErrorMsg,
    showAlert,
    setShowAlert,
    submitting,
    setSubmitting,
    loading,
    navigate,
  } = useAuthPage();

  const onRedirectHandler = () => navigate(redirectRoute);

  const onSubmitHandler = async () => {
    setSubmitting(true);
    setShowAlert(false);
    setErrorMsg('');

    const { userCredential, error } = await authFn(email, password);

    setTimeout(() => {
      setSubmitting(false);

      if (error) {
        setShowAlert(true);
        setErrorMsg(error.code);
        return;
      }

      if (userCredential) {
        // save user in context for auth provider
        setUser(userCredential.user);

        // prevent backtracking to login page
        navigate(AppRoutes.Gallery, { replace: true });
      }
    }, 1000);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {showAlert && (
          <Alert
            message={errorMsg}
            type="error"
            showIcon
            onClose={() => setShowAlert(false)}
            closable
            style={{ position: 'absolute', top: '16px', left: '16px', right: '16px' }}
          />
        )}
        <Card title={pageText} style={{ padding: '16px', minWidth: '400px' }}>
          <AuthForm
            email={email}
            password={password}
            loading={submitting}
            btnText={pageText}
            redirectText={redirectText}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmitHandler={onSubmitHandler}
            onRedirectHandler={onRedirectHandler}
          />
        </Card>
      </Content>
    </Layout>
  );
};
