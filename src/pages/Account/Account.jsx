import Layout from 'antd/es/layout/layout';
import Typography from 'antd/es/typography/Typography';
import { useSelector } from 'react-redux';
import UserInfo from '../../components/User/UserInfo';
import AssetsTable from '../../components/User/Assets/AssetsTable';

export default function Account() {
  const user = useSelector((state) => state.user.entities);
  return (
    <Layout.Content
      style={{
        padding: '0 0 0 12px',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: ' blur(5px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
        margin: '0 10px 70px',
        overflow: 'scroll'
      }}
    >
      <Typography.Title style={{ color: '#fff' }} level={2}>
        Welcome back, {user.name}
      </Typography.Title>
      <UserInfo />
      <AssetsTable />
    </Layout.Content>
  );
}
