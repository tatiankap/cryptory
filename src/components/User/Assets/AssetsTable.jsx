import {
  Table,
  Layout,
  Typography,
  Flex,
  Popconfirm,
  Button,
  Drawer
} from 'antd';
import { useDispatch } from 'react-redux';
import { deleteAsset } from '../../../store/slices/userSlice';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useCrypto } from '../../../hooks/useCrypto';
import AssetForm from './AssetForm';
import { useUserCrypto } from '../../../hooks/useUserCrypto';

export default function AssetsTable() {
  const dispatch = useDispatch();
  const [asset, setAsset] = useState();
  const [drawer, setDrawer] = useState(false);
  const { assets } = useUserCrypto();
  const { coins } = useCrypto();

  const handleDelete = (id) => {
    dispatch(deleteAsset(id));
  };

  const handleChange = (value) => {
    setDrawer(true);
    setAsset({ ...coins.find((c) => c.id === value.key), ...value });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Price(bought), $',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Price(spend), $',
      dataIndex: 'total'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <Flex justify="space-evenly">
            <Popconfirm
              color="#001529"
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: 'red'
                  }}
                />
              }
            >
              <Button size="small" danger style={{ width: 'fit-content' }}>
                Delete
              </Button>
            </Popconfirm>
            <Popconfirm
              color="#001529"
              title="Sure to change?"
              onConfirm={() => handleChange(record)}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: 'red'
                  }}
                />
              }
            >
              <Button
                size="small"
                style={{ width: 'fit-content', color: 'green' }}
              >
                Change
              </Button>
            </Popconfirm>
          </Flex>
        ) : null
    }
  ];
  const data = assets.map((a) => ({
    key: a.id,
    name: a.id,
    price: a.price,
    total: a.price * a.amount,
    amount: a.amount,
    date: a.date
  }));

  return (
    <Layout
      style={{
        padding: 10,
        backgroundColor: '#29142cb0',
        backdropFilter: 'blur(5px)'
      }}
    >
      {/* <Typography.Title level={3}>Portfolio:</Typography.Title> */}
      <Flex vertical="vertical">
        <Typography.Title level={4} style={{ color: '#fff' }}>
          Assets
        </Typography.Title>
        <Table size="middle" columns={columns} dataSource={data} />
      </Flex>

      <Drawer
        destroyOnClose
        width={600}
        open={drawer}
        onClose={() => setDrawer((prev) => !prev)}
      >
        <AssetForm asset={asset} onClose={() => setDrawer((prev) => !prev)} />
      </Drawer>
    </Layout>
  );
}
