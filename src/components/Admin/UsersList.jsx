import { List, Typography, Layout, Image, Card } from 'antd';
import { useSelector } from 'react-redux';

export default function UsersList() {
  const users = useSelector((state) => state.admin.entities?.users);

  return (
    <Layout style={{ borderRadius: 10, padding: 10 }}>
      <Typography.Title level={5}>Users List</Typography.Title>
      <List
        dataSource={users}
        bordered
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 6,
          xxl: 3
        }}
        renderItem={(user) => (
          <List.Item>
            <Card
              title={
                <span>
                  <Image src={user.image} width={20} />
                  {user.displayName}
                </span>
              }
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <p>
                <Typography.Text strong>Name, Surname:</Typography.Text>{' '}
                {user.name} {user.surname}
              </p>
              <p>
                <Typography.Text strong>Email:</Typography.Text> {user.email}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </Layout>
  );
}
