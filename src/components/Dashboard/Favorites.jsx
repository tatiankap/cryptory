import { Row, Button } from 'antd';
import Layout from 'antd/es/layout/layout';
import { useUserCrypto } from '../../hooks/useUserCrypto';
import Typography from 'antd/es/typography/Typography';
import { useNavigate } from 'react-router-dom';

import FavoriteCard from './FavoriteCard';

export default function Favorites() {
  const { favorites } = useUserCrypto();

  const navigate = useNavigate();

  if (!favorites.length) {
    return (
      <Layout.Content>
        <Typography.Title level={3}>
          You can add favorites coin in
          <Button style={{ marginLeft: 10 }} onClick={() => navigate('/coins')}>
            coins
          </Button>
        </Typography.Title>
      </Layout.Content>
    );
  }

  return (
    <Layout.Content>
      <Row gutter={16}>
        {favorites.map((favorite) => (
          <FavoriteCard favorite={favorite} key={favorite.id} />
        ))}
      </Row>
    </Layout.Content>
  );
}
