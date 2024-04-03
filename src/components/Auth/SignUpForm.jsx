import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(
      signUp(
        {
          ...values,
          displayName: `${values.name} ${values.surname}`
        },
        navigate
      )
    );
  };

  return (
    <Form
      onFinish={handleSubmit}
      name="signup"
      labelCol={{
        span: 8
      }}
      wrapperCol={{
        span: 16
      }}
      style={{
        width: 600
      }}
    >
      <Form.Item
        label="First name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="surname"
        rules={[
          {
            required: true,
            message: 'Please input your last name!'
          }
        ]}
      >
        <Input />
      </Form.Item>

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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
