import { useEffect, useRef, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
  Flex
} from 'antd';
import { useCrypto } from '../../../hooks/useCrypto';
import CoinCard from '../AccountInfo/CoinCard';
import { useDispatch } from 'react-redux';
import { addUserCoin } from '../../../store/slices/userSlice';
import { CloseCircleOutlined } from '@ant-design/icons';

export default function AddAssetForm({ onClose, asset }) {
  const { coins } = useCrypto();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [coin, setCoin] = useState();
  const [submitted, setSubmitted] = useState(false);

  const assetRef = useRef();
  useEffect(() => {
    if (asset) {
      setCoin(asset);
    }
  }, []);

  if (submitted) {
    return (
      <Result
        status={'success'}
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{
          width: '100%'
        }}
        showSearch
        onSelect={(v) => setCoin(coins.find((c) => c.id === v))}
        options={coins.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.image
        }))}
        placeholder="Select coin"
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} />
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: +values.price,
      date: values.date?.$d ?? new Date()
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    dispatch(addUserCoin(newAsset));
  };

  const handleAmountChange = (value) => {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(value * price)
    });
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue('amount');

    form.setFieldsValue({
      total: +(value * amount)
    });
  };

  const handleTotalChange = (value) => {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      amount: +(value / price)
    });
  };

  const handleResetForm = () => {
    setCoin();
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 10
      }}
      style={{
        maxWidth: 600
      }}
      initialValues={{
        price: coin.price.toFixed(2)
      }}
      onFinish={onFinish}
    >
      <Flex justify="space-between">
        <CoinCard coin={coin} />
        <Button
          onClick={handleResetForm}
          shape="circle"
          icon={<CloseCircleOutlined />}
          style={{ border: 'none', background: 'transparent' }}
        />
      </Flex>
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0
          }
        ]}
      >
        <InputNumber
          onChange={handleAmountChange}
          placeholder="Enter coin amount"
          value={coin.amount}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber
          value={coin.price}
          onChange={handlePriceChange}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Total, $"
        name="total"
        rules={[
          {
            type: 'number',
            min: 0
          }
        ]}
      >
        <InputNumber
          value={coin.total}
          onChange={handleTotalChange}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
