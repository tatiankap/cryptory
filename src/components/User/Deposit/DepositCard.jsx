import { Col, Button, Typography, Space } from 'antd';
import { Card } from 'antd';
import { ImageFinder } from '../../../utils/helper';
import { EditOutlined } from '@ant-design/icons';
import { useUserCrypto } from '../../../hooks/useUserCrypto';

export default function DepositCard({ handleOpenDrawer }) {
  const { deposit } = useUserCrypto();

  return (
    <Col>
      <Card
        bordered={false}
        style={{
          background: '#011528a1',
          backdropFilter: 'blur(5px)',
          minHeight: 135
        }}
      >
        <Typography.Title style={{ color: '#fff' }} level={5}>
          Total Deposit
        </Typography.Title>
        {deposit && (
          <>
            <Space
              wrap
              style={{
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <ImageFinder src="wallet-money.svg" />
              <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                $ {deposit}
              </Typography.Title>
              <Button
                onClick={() => handleOpenDrawer('deposit')}
                icon={<EditOutlined />}
              />
            </Space>
          </>
        )}
        {!deposit && (
          <Button onClick={() => handleOpenDrawer('deposit')}>
            Add Deposit
          </Button>
        )}
      </Card>
    </Col>
  );
}
