import { Button, Dropdown, Space } from 'antd';
import { logOutAdmin } from '../../store/slices/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function HeaderAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = [
    {
      label: <Button onClick={handleLogOut}>Logout</Button>,
      key: '0'
    }
  ];

  function handleLogOut() {
    dispatch(logOutAdmin(navigate));
  }
  return (
    <Space>
      <Dropdown
        menu={{
          items
        }}
        trigger={['click']}
      >
        <Space>Admin</Space>
      </Dropdown>
    </Space>
  );
}
