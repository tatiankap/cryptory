import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Typography, Tag, Divider, Space, Progress, Flex } from 'antd';
import CoinInfo from './CoinInfo';
export default function CoinInfoModal({ coin }) {
  const coinData = [
    {
      value: `$${coin.current_price.toFixed(2)}`,
      title: 'Price:',
      key: 'price'
    },
    {
      value: `$${coin.market_cap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
      title: 'Market Cap:',
      key: 'marketCap'
    },
    {
      value: coin.fully_diluted_valuation
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      title: 'Fully Diluted Valuation:',
      key: 'fdv'
    },
    {
      value: coin.circulating_supply
        .toFixed()
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      title: 'Circulating Suppl:',
      key: 'circulatingSuppl'
    },
    {
      value: `$${coin.total_supply
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
      title: 'Total Supply:',
      key: 'totalSupply'
    },
    {
      value: `$${coin.max_supply.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
      title: 'Max Supply:',
      key: 'maxSupply'
    }
  ];

  return (
    <>
      <Space>
        <img
          src={coin.image}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title level={2} style={{ margin: 0, color: '#000' }}>
          <span>({coin.symbol})</span> {coin.name}
        </Typography.Title>
      </Space>
      <Divider />
      <Flex vertical style={{ marginBottom: 15 }}>
        <Progress
          status="active"
          percent={
            ((coin.current_price - coin.low_24h) * 100) /
            (coin.high_24h - coin.low_24h)
          }
          showInfo={false}
          strokeColor={{ from: '#108ee9', to: '#87d068' }}
        />
        <Flex justify="space-between">
          <span>{coin.low_24h}USD</span>
          <span>24h Range</span>
          <span>{coin.high_24h}USD</span>
        </Flex>
      </Flex>
      <Typography.Paragraph>
        <Typography.Text strong>
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

        <Typography.Text strong>
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
          {}
          {coin.atl_change_percentage.toFixed(2)}%
        </Tag>
      </Typography.Paragraph>

      {coinData.map(({ value, title, key }) => (
        <CoinInfo key={key} value={value} title={title} />
      ))}
    </>
  );
}
