import { useState } from 'react';
import { Button, InputNumber, Select, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { addUserDeposit } from '../../../store/slices/userSlice';

export default function AddDeposit({ onClose }) {
  const dispatch = useDispatch();
  const [deposit, setDeposit] = useState(100);

  const selectBefore = (
    <Select
      defaultValue="add"
      style={{
        width: 60
      }}
    >
      <Select.Option value="add">+</Select.Option>
      <Select.Option value="minus">-</Select.Option>
    </Select>
  );

  const onChange = (value) => {
    setDeposit(Number(value));
  };

  const handleAddDeposit = () => {
    dispatch(
      addUserDeposit({
        deposit
      })
    );
    onClose();
  };

  return (
    <Space>
      <InputNumber
        min={1}
        onChange={onChange}
        addonBefore={selectBefore}
        addonAfter="$"
        defaultValue={deposit}
      />
      <Button onClick={handleAddDeposit}>Add Deposit</Button>
    </Space>
  );
}
