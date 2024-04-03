import { Flex, Layout, Tabs } from 'antd';
import LoginForm from '../components/Auth/LoginForm';
import SignUpForm from '../components/Auth/SignUpForm';

export default function Login() {
  return (
    <Layout.Content
      style={{
        padding: 32,
        display: 'flex',
        justifyContent: 'center'
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
        <Tabs
          type="card"
          items={[
            {
              key: 'signin',
              label: 'Sign In',
              children: <LoginForm />,
              style: { color: '#000' }
            },
            {
              key: 'signup',
              label: 'Sign Up',
              children: <SignUpForm />,
              style: { color: '#000' }
            }
          ]}
        />
      </Flex>
    </Layout.Content>
  );
}
