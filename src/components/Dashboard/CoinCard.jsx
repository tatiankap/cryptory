import {
  HeartOutlined,
  HeartFilled,
  CaretUpOutlined,
  CaretDownOutlined
} from '@ant-design/icons';
import { Col, Image, Row, Space, Typography, List, Button, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFavoriteCoin,
  toggleFavoriteCoin
} from '../../store/slices/userSlice';

function CoinInfo({ coin }) {
  const dispatch = useDispatch();
  const isFavorite = (useSelector(getFavoriteCoin(coin.id)) && true) || false;
  const data = [
    {
      value: `$${coin.current_price.toFixed(2)}`,
      title: 'Price:'
    },
    {
      value: `$${coin.market_cap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
      title: 'Market Cap:'
    },
    {
      value: coin.fully_diluted_valuation
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      title: 'Fully Diluted Valuation:'
    },
    {
      value: coin.circulating_supply
        .toFixed()
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      title: 'Circulating Suppl:'
    },
    {
      value: `$${coin.total_supply
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
      title: 'Total Supply:'
    },
    {
      value: `$${coin.max_supply.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
      title: 'Max Supply:'
    }
  ];

  const handleAddToFavorite = () => {
    dispatch(toggleFavoriteCoin(coin));
    // if (isFavorite) {
    //   dispatch(removeCoinFromFavorite(coin.id));
    // } else {
    //   dispatch(addCoinToFavorites(coin));
    // }
  };

  return (
    <Row gutter={16}>
      <Col
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          background: '#ffffff00',
          padding: 10,
          backdropFilter: 'blur(5px)',
          boxShadow: '-2px 1px 5px 1px #cbd5e1'
        }}
        span={6}
      >
        <Space direction="horizontal" style={{ display: 'flex' }}>
          <Image src={coin.image} alt={coin.name} width={30} />
          <Typography.Title level={3} style={{ margin: 0 }}>
            {coin.name}
          </Typography.Title>
          <Tag color="geekblue">{coin.symbol.toUpperCase()}</Tag>
        </Space>
        <Space direction="horizontal" style={{ marginTop: 15 }}>
          <Typography.Title level={2} style={{ margin: 0 }}>
            $
            {coin.current_price
              .toFixed(2)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          </Typography.Title>
        </Space>
        <Space style={{ marginTop: 15 }}>
          <Button
            icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
            onClick={handleAddToFavorite}
          >
            Add to favorite
          </Button>
        </Space>
        <Space style={{ marginTop: 15 }}>
          <Typography.Text strong style={{ color: '#fff' }}>
            All-Time High: <span>${coin.ath}</span>
          </Typography.Text>
          <Tag
            color={coin.ath_change_percentage > 0 ? 'green' : 'red'}
            style={{ marginLeft: 5 }}
            icon={
              coin.atl_change_percentage > 0 ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )
            }
          >
            {coin.ath_change_percentage.toFixed(2)}%
          </Tag>
        </Space>
        <Space>
          <Typography.Text strong style={{ color: '#fff' }}>
            All-Time Low: <span>${coin.atl}</span>
          </Typography.Text>
          <Tag
            color={coin.atl_change_percentage > 0 ? 'green' : 'red'}
            style={{ marginLeft: 5 }}
            icon={
              coin.atl_change_percentage > 0 ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )
            }
          >
            {coin.atl_change_percentage.toFixed(2)}%
          </Tag>
        </Space>
      </Col>

      <Col
        span={16}
        style={{
          background: '#fff',
          borderRadius: 10,
          marginLeft: 10
        }}
      >
        <Typography.Title level={3} style={{ color: '#000' }}>
          Info
        </Typography.Title>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item extra={item.value} style={{ padding: 0 }}>
              <List.Item.Meta title={item.title} />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}

export default CoinInfo;
