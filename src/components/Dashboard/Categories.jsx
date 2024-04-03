import { Table, Typography, Space, Image } from 'antd';
import { useCrypto } from '../../hooks/useCrypto';

export default function Categories() {
  const { categories } = useCrypto();
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      rowScope: 'row',
      sorter: (a, b) => a.key - b.key
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.length - b.category.length
    },
    {
      title: 'Top Coins',
      dataIndex: 'coins',
      render: (coins) => (
        <Space>
          {coins.map((coin) => (
            <Image key={coin} src={coin} width={20} />
          ))}
        </Space>
      )
    },
    {
      title: 'Market Capitalization',
      dataIndex: 'market',
      sorter: (a, b) => a.market - b.market,
      render: (number) => (
        <Typography.Text>
          {number
            ? `$${number
                ?.toFixed()
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
            : '-'}
        </Typography.Text>
      )
    },
    {
      title: '24h Volume',
      dataIndex: 'volume',
      render: (number) => (
        <Typography.Text>
          {number
            ? `$${number
                ?.toFixed()
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
            : '-'}
        </Typography.Text>
      )
    }
  ];

  const data = categories.map((c, index) => ({
    key: index + 1,
    category: c.name,
    coins: c.top_3_coins || [],
    market: c.market_cap,
    volume: c.volume_24h
  }));

  return (
    <>
      <Space direction="vertical" style={{ paddingBottom: 10 }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Top Crypto Categories By Market Cap
        </Typography.Title>
        <Typography.Text style={{ color: '#fff' }}>
          View the largest cryptocurrency categories based on market
          capitalization.
        </Typography.Text>
      </Space>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
