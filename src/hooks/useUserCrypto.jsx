import { useSelector } from 'react-redux';
import { percentDifference } from '../utils/utils';
import { useCrypto } from './useCrypto';

export function useUserCrypto() {
  const { coins } = useCrypto();
  const assets = useSelector((state) => state.user.entities?.assets) || [];
  const deposit = useSelector((state) => state.user.entities?.deposit) || null;
  const favorites =
    useSelector((state) => state.user.entities?.favorites) || [];

  const newAssets = assets.map((asset) => {
    const coin = coins.find((c) => c.id === asset.id);

    return {
      grow: asset.price < coin.current_price,
      growPercent: percentDifference(asset.price, coin.current_price),
      totalAmount: asset.amount * coin.current_price,
      totalProfit:
        asset.amount * coin.current_price - asset.amount * asset.price,
      ...asset
    };
  });

  return {
    assets: newAssets,
    favorites,
    deposit
  };
}
