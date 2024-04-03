import { Space, Table, Typography } from 'antd';

export default function DashboardAssetsTable({ assets }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount
    }
  ];

  const data = assets.map((a) => ({
    key: a.id,
    name: a.id,
    amount: a.amount.toFixed(5)
  }));

  return (
    <>
      <Space>
        <Typography.Title style={{ color: '#fff' }} level={4}>
          Portfolio Assets:
        </Typography.Title>
      </Space>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
