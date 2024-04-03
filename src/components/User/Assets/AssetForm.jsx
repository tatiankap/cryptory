import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Image,
  InputNumber,
  Result,
  Select,
  Space
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCrypto } from '../../../hooks/useCrypto';
import CoinCard from '../AccountInfo/CoinCard';
import { CloseCircleOutlined } from '@ant-design/icons';
import { addUserCoin } from '../../../store/slices/userSlice';

export default function AssetForm({ asset, onClose }) {
  const { coins } = useCrypto();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const assetRef = useRef();

  const [coin, setCoin] = useState();
  const [submitted, setSubmitted] = useState(false);

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
            <Image style={{ width: 20 }} src={option.data.icon} />
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
      date: values.date?.$d.toString() ?? new Date()
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
        maxWidth: 600,
        color: '#000'
      }}
      initialValues={{
        price: coin.price || coin.current_price,
        amount: coin.amount,
        total: coin.total,
        date: dayjs(coin.date)
      }}
      onFinish={onFinish}
    >
      <Flex justify="space-between" style={{ alignItems: 'center' }}>
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
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Date & Time"
        name="date"
        rules={[
          {
            required: true
          }
        ]}
      >
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
        <InputNumber onChange={handleTotalChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
