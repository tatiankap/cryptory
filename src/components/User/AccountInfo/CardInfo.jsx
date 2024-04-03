import { Col, Button, Card, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export default function CardInfo({ info, handleOpenDrawer }) {
  return (
    <Col span={8}>
      <Card title={info.title}>
        {!info.value && (
          <Button onClick={() => handleOpenDrawer(info.key)}>
            {info.content}
          </Button>
        )}

        {!!info.value && (
          <Space
            wrap
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>
              {info.symbol} {info.value}
            </span>
            <Button
              onClick={() => handleOpenDrawer(info.key)}
              icon={<EditOutlined />}
            />
          </Space>
        )}
      </Card>
    </Col>
  );
}
