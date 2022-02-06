import { Alert, Button, Card, Divider, Form, Input, Layout } from 'antd';
import { loginToApp, signUpForApp } from 'api/auth';
import { AuthContext, AuthContextType } from 'providers/AuthProvider';
import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'utils/routes';

const { Content } = Layout;

export interface AuthFormProps {
  isLoginForm: boolean;
  // authFn: (email: string, password: string) => Promise<AuthReturnType>;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLoginForm }) => {
  const { setUser } = useContext<AuthContextType>(AuthContext);

  // TODO: rework this to be undefined by default —— add client-side check for validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const onRedirectHandler = () => navigate(isLoginForm ? AppRoutes.SignUp : AppRoutes.Login);

  const onSubmitHandler = async () => {
    setLoading(true);
    setShowErrorToast(false);
    setErrorMsg('');

    const { userCredential, error } = await (isLoginForm ? loginToApp : signUpForApp)(
      email,
      password,
    );

    setTimeout(() => {
      setLoading(false);

      if (error) {
        setShowErrorToast(true);
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {showErrorToast && (
        <Alert
          message={errorMsg}
          type="error"
          showIcon
          onClose={() => setShowErrorToast(false)}
          closable
          style={{ position: 'absolute', top: '16px', left: '16px', right: '16px' }}
        />
      )}
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          title={isLoginForm ? 'Login' : 'Sign Up'}
          style={{ padding: '16px', minWidth: '400px' }}
        >
          <Form onFinish={onSubmitHandler} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Email" name="email" required>
              <Input
                placeholder="Email"
                type="email"
                disabled={loading}
                value={email}
                onChange={onEmailChangeHandler}
              />
            </Form.Item>
            <Form.Item label="Password" name="password" required>
              <Input
                placeholder="Password"
                type="password"
                disabled={loading}
                value={password}
                onChange={onPasswordChangeHandler}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                loading={loading}
                disabled={loading}
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                {isLoginForm ? 'Login' : 'Sign Up'}
              </Button>
            </Form.Item>
          </Form>
          <Divider />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button type="link" style={{ textDecoration: 'underline' }} onClick={onRedirectHandler}>
              {isLoginForm ? 'Sign Up' : 'Login'}
            </Button>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};
