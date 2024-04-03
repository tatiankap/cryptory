import { Layout } from 'antd';
import AppSider from '../../components/Sider/AppSider';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

export default function Dashboard() {
  return (
    <Content
      style={{
        // padding: '0 48px',
        height: '100%',
        display: 'flex'
      }}
    >
      <AppSider />
      <Layout.Content
        style={{
          background: '#ffffff33',
          borderRadius: 10,
          backdropFilter: ' blur(5px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          padding: 10,
          margin: '0 10px 70px',
          overflow: 'scroll'
        }}
      >
        <Outlet />
      </Layout.Content>
    </Content>
  );
}
