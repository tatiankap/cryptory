import { Typography } from 'antd';

export default function CoinInfo({ value, title }) {
  return (
    <Typography.Paragraph>
      <Typography.Text strong>
        {title} {value}
      </Typography.Text>
    </Typography.Paragraph>
  );
}
