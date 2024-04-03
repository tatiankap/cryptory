import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HOME_ROUTE,
  COINS_ROUTE,
  CATEGORIES_ROUTE,
  FAVORITES_ROUTE,
  USER_ROUTE
} from '../../utils/routes';
import { getUserId } from '../../services/localStorage.service';
import { useUserCrypto } from '../../hooks/useUserCrypto';

import { Button, Card, Flex, Layout, Menu, Space, Statistic } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  HeartOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';
import { capitalize } from '../../utils/utils';
import { useSelector } from 'react-redux';

export default function AppSider() {
  const location = useLocation();
  const { assets } = useUserCrypto();
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  const items = [
    {
      label: <Link to={HOME_ROUTE}>Dashboard</Link>,
      key: 'dashboard',
      icon: <HomeOutlined />
    },
    {
      label: <Link to={USER_ROUTE + '/' + getUserId()}>User</Link>,
      key: 'user',
      icon: <UserOutlined />
    },
    {
      label: <Link to={COINS_ROUTE}>Coins</Link>,
      key: 'coins',
      icon: <DollarOutlined />
    },
    {
      label: <Link to={CATEGORIES_ROUTE}>Categories</Link>,
      key: 'categories',
      icon: <UnorderedListOutlined />
    },
    {
      label: <Link to={FAVORITES_ROUTE}>Favorites</Link>,
      key: 'favorites',
      icon: <HeartOutlined />
    }
  ];

  const path = location.pathname.split('/')[1] || 'dashboard';

  return (
    <Layout.Sider width={200} style={{ background: '#001529' }}>
      <Menu
        theme="dark"
        style={{
          height: '100%',
          borderRadius: 10,
          backdropFilter: 'blur(5px)',
          background: '#ffffff33',
          color: '#fff'
        }}
        defaultSelectedKeys={[path]}
        defaultOpenKeys={[path]}
        selectedKeys={[path]}
        mode="inline"
        items={items}
      />
      {!!assets.length && (
        <Flex vertical style={{ alignItems: 'center', margin: '10px 0' }}>
          {assets
            .map((asset) => (
              <Card key={asset.id} style={{ marginBottom: '1rem' }}>
                <Statistic
                  title={capitalize(asset.id)}
                  value={asset.growPercent}
                  precision={2}
                  valueStyle={{
                    color: asset.grow ? '#3f8600' : '#cf1322'
                  }}
                  prefix={
                    asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                  suffix="%"
                />
              </Card>
            ))
            .splice(0, 3)}
          <Space>
            <Button onClick={() => navigate(`/user/${userId}`)}>
              Show more assets
            </Button>
          </Space>
        </Flex>
      )}
    </Layout.Sider>
  );
}
