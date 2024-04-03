import Layout from 'antd/es/layout/layout';
import { useCrypto } from '../../../hooks/useCrypto';
import { Tabs, Typography } from 'antd';
import { capitalize } from '../../../utils/utils';
import TrendingList from './TrendingList';

export default function Trending() {
  const { trending } = useCrypto();

  const items = Object.keys(trending).map((item) => ({
    key: item,
    label: capitalize(item),
    children: <TrendingList data={trending[item]} />
  }));
  return (
    <Layout
      style={{
        padding: 10,
        borderRadius: 10,
        background: '#ffffff00',
        backdropFilter: ' blur(5px)'
      }}
    >
      <Typography.Title level={5} strong>
        🔥 Trending
      </Typography.Title>
      <Tabs items={items} style={{ color: '#fff' }} />
    </Layout>
  );
}
