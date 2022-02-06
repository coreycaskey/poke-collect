import { Button, Divider, Form, Input, Space } from 'antd';
import { ChangeEvent } from 'react';

import 'styles/auth.css';

export interface AuthFormProps {
  email: string;
  password: string;
  loading: boolean;
  btnText: string;
  redirectText: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onSubmitHandler: () => Promise<void>;
  onRedirectHandler: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  email,
  password,
  loading,
  btnText,
  redirectText,
  setEmail,
  setPassword,
  onSubmitHandler,
  onRedirectHandler,
}) => {
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  // TODO: extract rules into separate file
  return (
    <>
      <Form
        layout="vertical"
        onFinish={onSubmitHandler}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input
            placeholder="Email"
            disabled={loading}
            value={email}
            onChange={onEmailChangeHandler}
          />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password
            placeholder="Password"
            disabled={loading}
            value={password}
            onChange={onPasswordChangeHandler}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            {btnText}
          </Button>
        </Form.Item>
        <Divider />
      </Form>
      <Space className="auth-redirect-container">
        <Button type="link" onClick={onRedirectHandler} className="auth-redirect-link">
          {redirectText}
        </Button>
      </Space>
    </>
  );
};
