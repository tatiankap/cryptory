import { Col, Card, Space, Statistic, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { percentDifference } from '../../../utils/utils';
import { ImageFinder } from '../../../utils/helper';
import { useCrypto } from '../../../hooks/useCrypto';
import { useUserCrypto } from '../../../hooks/useUserCrypto';

export default function AssetsCard() {
  const { coins } = useCrypto();
  const { assets } = useUserCrypto();

  const cryptoPriceMap = coins.reduce((acc, c) => {
    acc[c.id] = c.current_price;
    return acc;
  }, {});
  const totalValueAssets = Number(
    assets
      .map((asset) => asset.amount * cryptoPriceMap[asset.id])
      .reduce((acc, v) => (acc += v), 0)
      .toFixed(2)
  );

  const valueAssets = Number(
    assets
      .map((asset) => asset.amount * asset.price)
      .reduce((acc, v) => (acc += v), 0)
      .toFixed(2)
  );
  const assetsGrow = totalValueAssets - valueAssets;
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
        {
          <>
            <Typography.Title style={{ color: '#fff' }} level={5}>
              Total Assets
            </Typography.Title>
            <Space
              wrap
              style={{
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <ImageFinder src="moneys.svg" />
              <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                $ {totalValueAssets}
              </Typography.Title>
            </Space>
            <Space>
              {!!assets.length && (
                <Statistic
                  value={percentDifference(totalValueAssets, valueAssets)}
                  precision={2}
                  valueStyle={{
                    color: assetsGrow ? '#3f8600' : '#cf1322',
                    fontSize: 12
                  }}
                  prefix={
                    assetsGrow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                  suffix="%"
                />
              )}
            </Space>
          </>
        }
      </Card>
    </Col>
  );
}
