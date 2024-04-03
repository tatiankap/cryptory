import { Avatar, Button, Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/slices/userSlice';

export default function HeaderUser() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = [
    {
      label: <Button onClick={handleLogOut}>Logout</Button>,
      key: '0'
    }
  ];

  function handleLogOut() {
    dispatch(logOut(navigate));
  }
  return (
    <Space>
      <Dropdown
        menu={{
          items
        }}
        trigger={['click']}
      >
        <Space>
          <Avatar
            size={'small'}
            icon={
              user.isLoggedIn ? (
                <img src={user?.entities?.image} alt="user" />
              ) : (
                <UserOutlined />
              )
            }
          />
          {user.name}
        </Space>
      </Dropdown>
    </Space>
  );
}
