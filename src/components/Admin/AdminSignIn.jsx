import { Button, Flex, Form, Input, Layout, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { signInAdmin } from '../../store/slices/adminSlice';

export default function AdminSignIn() {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(signInAdmin(values));
  };
  return (
    <Layout.Content
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Flex
        vertical
        align="center"
        style={{
          background: '#ffffff33',
          padding: '10px 100px 10px 10px',
          backdropFilter: 'blur(5px)',
          boxShadow: '-2px 1px 5px 1px #cbd5e1',
          borderRadius: 10
        }}
      >
        <Typography.Title level={2} style={{ color: '#fff' }}>
          Sign In in admin panel
        </Typography.Title>

        <Form
          style={{
            width: 500
          }}
          onFinish={handleSubmit}
          name="loginAdmin"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your Email!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              },
              () => ({
                validator(_, value) {
                  const capitalRegExp = /[A-Z]+/g;
                  if (value) {
                    if (value.length < 7)
                      return Promise.reject(
                        new Error('Password must be at least 7!')
                      );
                    if (!capitalRegExp.test(value))
                      return Promise.reject(
                        new Error(
                          'Password must contain at least one uppercase letter'
                        )
                      );
                  }
                  return Promise.resolve();
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button htmlType="submit">Log in</Button>
          </Form.Item>
        </Form>
      </Flex>
    </Layout.Content>
  );
}
