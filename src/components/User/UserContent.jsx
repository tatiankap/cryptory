import { useState } from 'react';
import AddDeposit from './Deposit/AddDeposit';
import { Row, Layout, Drawer, Card, Button, Col } from 'antd';
import AssetsCard from './Assets/AssetsCard';
import DepositCard from './Deposit/DepositCard';
import AssetForm from './Assets/AssetForm';
import UserAssetsChart from './UserAssetsChart';
import DashboardAssetsTable from './Assets/DashboardAssetsTable';
import { useUserCrypto } from '../../hooks/useUserCrypto';

export default function UserContent() {
  const { assets } = useUserCrypto();
  const [drawer, setDrawer] = useState({
    value: false,
    el: null
  });

  const handleOpenDrawer = (el) => setDrawer(() => ({ el, value: true }));

  return (
    <Layout.Content style={{ padding: '0 12px', minHeight: 280 }}>
      <Row gutter={16} style={{ alignItems: 'center' }}>
        <AssetsCard handleOpenDrawer={handleOpenDrawer} />
        <DepositCard handleOpenDrawer={handleOpenDrawer} />
        <Col>
          <Card
            bordered={false}
            style={{
              background: '#011528a1',
              backdropFilter: 'blur(5px)'
            }}
          >
            <Button
              style={{ color: '#fff', background: 'transparent' }}
              onClick={() => handleOpenDrawer('assets')}
            >
              Add asset
            </Button>
          </Card>
        </Col>
      </Row>

      {!!assets.length && (
        <Row style={{ marginTop: 20 }} gutter={16}>
          <Col span={12}>
            <UserAssetsChart />
          </Col>
          <Col span={12}>
            <DashboardAssetsTable assets={assets} />
          </Col>
        </Row>
      )}
      <Drawer
        destroyOnClose
        width={600}
        title={drawer.el}
        open={drawer.value}
        onClose={() => setDrawer((prev) => ({ ...prev, value: false }))}
      >
        {drawer.el === 'assets' && (
          <AssetForm
            onClose={() => setDrawer((prev) => ({ ...prev, value: false }))}
          />
        )}
        {drawer.el === 'deposit' && (
          <AddDeposit
            onClose={() => setDrawer((prev) => ({ ...prev, value: false }))}
          />
        )}
      </Drawer>
    </Layout.Content>
  );
}
