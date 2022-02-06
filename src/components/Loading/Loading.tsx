import { Layout, Spin } from 'antd';

const { Content } = Layout;

export interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </Content>
    </Layout>
  );
};
