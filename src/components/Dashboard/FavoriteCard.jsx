import { Button, Card, Col, Image, Space } from 'antd';
import {
  addCoinToFavorites,
  getFavoriteCoin,
  removeCoinFromFavorite
} from '../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

export default function FavoriteCard({ favorite }) {
  const isFavorite =
    (useSelector(getFavoriteCoin(favorite.id)) && true) || false;

  const dispatch = useDispatch();

  const handleAddToFavorite = () => {
    if (isFavorite) {
      dispatch(removeCoinFromFavorite(favorite.id));
    } else {
      dispatch(addCoinToFavorites(favorite));
    }
  };

  return (
    <Col span={8} key={favorite.id}>
      <Card bordered={false}>
        <Space>
          <Image src={favorite.image} width={15} /> {favorite.name}
        </Space>
        <Button
          icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
          onClick={handleAddToFavorite}
        >
          Remove favorite
        </Button>
      </Card>
    </Col>
  );
}
