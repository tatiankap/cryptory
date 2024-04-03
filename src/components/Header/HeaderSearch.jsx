import { useState } from 'react';
import { useCrypto } from '../../hooks/useCrypto';
import { Modal, Select, Space } from 'antd';
import CoinInfoModal from '../Coin/CoinInfoModal';

export default function HeaderSearch() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);

  const { coins } = useCrypto();

  function handleSelect(value) {
    setCoin(coins.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <>
      <Select
        style={{
          width: 250
        }}
        showSearch
        open={select}
        value="Search for coin"
        onClick={() => setSelect((prev) => !prev)}
        options={coins.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.image
        }))}
        onSelect={handleSelect}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} />{' '}
            {option.data.label}
          </Space>
        )}
      />
      <Modal
        open={modal}
        width={600}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
    </>
  );
}
