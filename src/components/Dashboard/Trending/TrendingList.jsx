import { Avatar, Card, Image, List, Space, Tag, Typography } from 'antd';
import TrendingCard from './TrendingCard';
import { useCrypto } from '../../../hooks/useCrypto';

export default function TrendingList({ data }) {
  const { coins } = useCrypto();
  const transformedData = data.map((el) =>
    el.hasOwnProperty('item') ? el.item : el
  );

  const getNativeCurrency = (item) =>
    coins.find((c) => c.symbol === item.native_currency_symbol);

  return (
    <List
      itemLayout="horizontal"
      dataSource={transformedData}
      renderItem={(item) => {
        const nativeCurrency = getNativeCurrency(item);
        return (
          <List.Item>
            <List.Item.Meta
              title={
                <Space>
                  <Avatar src={item.small || item.thumb}>
                    {!(item.small || item.thumb) && item.name.substr(0, 1)}
                  </Avatar>

                  <Typography.Text style={{ color: '#fff' }}>
                    {item.name}
                    {nativeCurrency && (
                      <Tag color="green" style={{ marginLeft: 10 }}>
                        {nativeCurrency.name}{' '}
                      </Tag>
                    )}
                  </Typography.Text>
                </Space>
              }
              description={
                <Space>
                  {item.data.sparkline && (
                    <Card>
                      <Image src={item.data.sparkline} />
                      <p>Last 7 Days</p>
                    </Card>
                  )}

                  {item.data.floor_price && (
                    <TrendingCard
                      value={item.data.floor_price}
                      title="Floor Price"
                    />
                  )}

                  {item.data.h24_average_sale_price && (
                    <TrendingCard
                      value={item.data.h24_average_sale_price}
                      title="24h Average Sale Price"
                    />
                  )}
                  {item.market_cap_ran ||
                    (item.data.market_cap && (
                      <TrendingCard
                        value={item.market_cap_ran || item.data.market_cap}
                        title="Market Capitalization"
                      />
                    ))}

                  {(item.data.total_volume || item.data.h24_volume) && (
                    <TrendingCard
                      value={item.data.total_volume || item.data.h24_volume}
                      title="24h Volume"
                    />
                  )}

                  {item.data.price && (
                    <TrendingCard
                      value={item.data.price?.toFixed(2)}
                      title="Price"
                    />
                  )}
                  {item.coins_count && (
                    <TrendingCard value={item.coins_count} title="Coins" />
                  )}
                </Space>
              }
            />
          </List.Item>
        );
      }}
    />
  );
}
