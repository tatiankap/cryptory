import { Row, Space, Image, Typography } from 'antd';

export default function CoinCard({ coin }) {
  return (
    <Row>
      <Space>
        <Image src={coin.image} alt={coin.name} width={30} />
        <Typography.Title level={3} style={{ margin: 0, color: '#000' }}>
          {coin.name}
        </Typography.Title>
      </Space>
    </Row>
  );
}
