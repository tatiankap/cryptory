import { Descriptions, Flex } from 'antd';
import { useSelector } from 'react-redux';

export default function UserInfo() {
  const user = useSelector((state) => state.user.entities);
  const items = [
    {
      key: '1',
      label: 'Name',
      children: user.name
    },
    {
      key: '2',
      label: 'Surname',
      children: user.surname
    },
    {
      key: '3',
      label: 'Email',
      children: user.email
    },
    {
      key: '4',
      label: 'Deposit, $',
      children: user.deposit || 0
    }
  ];
  return (
    <Flex
      style={{
        background: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10
      }}
    >
      <Descriptions title="User Info" items={items} />
    </Flex>
  );
}
