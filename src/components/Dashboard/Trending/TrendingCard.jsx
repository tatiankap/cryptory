import { Card, Typography } from 'antd';

export default function TrendingCard({ value, title }) {
  return (
    <Card>
      <Typography.Text strong>{value}</Typography.Text>
      <p> {title}</p>
    </Card>
  );
}
