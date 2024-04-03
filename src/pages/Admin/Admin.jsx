import { Button, Layout, Row, Typography, Card, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AdminSignIn from '../../components/Admin/AdminSignIn';
import UsersList from '../../components/Admin/UsersList';
import {
  getAdminIsLoggedIn,
  uploadCategories,
  uploadCoins,
  uploadTrending
} from '../../store/slices/adminSlice';

export default function Admin() {
  const dispatch = useDispatch();
  const isAdminAuth = useSelector(getAdminIsLoggedIn());

  const handleAddCategories = () => {
    dispatch(uploadCategories());
  };

  const handleAddCoins = () => {
    dispatch(uploadCoins());
  };

  const handleAddTrending = () => {
    dispatch(uploadTrending());
  };

  if (isAdminAuth) {
    return (
      <Layout.Content style={{ margin: 12 }}>
        <Typography.Title level={2} style={{ color: '#fff' }}>
          Welcome back, admin
        </Typography.Title>
        <UsersList />
        <Row gutter={16} style={{ marginTop: 10 }}>
          <Col span={8}>
            <Card title='Get categories from "Coingecko"'>
              <Button onClick={handleAddCategories}>Upload Categories</Button>
            </Card>
          </Col>

          <Col>
            <Card title='Get coins from "Coingecko"'>
              <Button onClick={handleAddCoins}>Upload Coins</Button>
            </Card>
          </Col>
          <Col>
            <Card title='Get trending from "Coingecko"'>
              <Button onClick={handleAddTrending}>Upload Trending</Button>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    );
  }

  return <AdminSignIn />;
}
