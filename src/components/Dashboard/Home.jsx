import Layout from 'antd/es/layout/layout';
import { useSelector } from 'react-redux';
import UserContent from '../User/UserContent';
import { getUserIsLoggedIn } from '../../store/slices/userSlice';
import { Typography } from 'antd';
import Trending from './Trending/Trending';

export default function Home() {
  const isLoggedIn = useSelector(getUserIsLoggedIn());

  if (isLoggedIn) {
    return <UserContent />;
  }

  return (
    <Layout.Content>
      <Typography.Title level={3}>Welcome to Dashboard!</Typography.Title>
      <Trending />
    </Layout.Content>
  );
}
