import { useSelector } from 'react-redux';

export function useCrypto() {
  const coins = useSelector((state) => state.crypto.coins) || [];
  const categories = useSelector((state) => state.crypto.categories) || [];
  const trending = useSelector((state) => state.crypto.trending) || [];

  return {
    coins,
    categories,
    trending
  };
}
