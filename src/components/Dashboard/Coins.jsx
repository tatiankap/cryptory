import { DatePicker, Image, Space, Table, Input } from 'antd';
import Typography from 'antd/es/typography/Typography';
import dayjs from 'dayjs';
import { useCrypto } from '../../hooks/useCrypto';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CoinInfo from './CoinCard';

export default function Coins() {
  const { coins } = useCrypto();
  const [searchValue, setSearch] = useState('');
  const { coinId } = useParams();
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      rowScope: 'row',
      sorter: (a, b) => a.key - b.key
    },
    {
      title: 'Coin Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name, coin) => (
        <Space direction="horizontal">
          <Image src={coin.image} width={20} />
          <Link to={coin.id}>
            <Typography.Text>{name}</Typography.Text>
          </Link>
        </Space>
      )
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <Typography.Text>
          $
          {price
            .toFixed(2)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Typography.Text>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'Market Capitalization',
      dataIndex: 'market',
      render: (price) => (
        <Typography.Text>
          ${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Typography.Text>
      )
    },
    {
      title: 'Last Updated',
      dataIndex: 'date',
      render: (data) => (
        <DatePicker disabled showTime defaultValue={dayjs(data)} />
      )
    }
  ];
  const handleChange = (value) => {
    setSearch(value);
  };

  const data = coins
    .filter((c) => c.name.toLowerCase().includes(searchValue))
    .map((c, key) => ({
      key: key + 1,
      id: c.id,
      name: c.name,
      symbol: c.symbol.toUpperCase(),
      date: c.last_updated,
      image: c.image,
      market: c.market_cap,
      price: c.current_price
    }));

  if (coinId) {
    return <CoinInfo coin={coins.find((c) => c.id === coinId)} />;
  }

  return (
    <>
      <Input.Search
        placeholder="Search coin by name..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <Table columns={columns} dataSource={data} />
    </>
  );
}
