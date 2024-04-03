import config from '../../config.json';
import axios from 'axios';

const http = axios.create({
  baseURL: config.apiCoingecko,
  params: {
    'x-cg-pro-api-key': import.meta.env.VITE_COINGECKO_KEY
  }
});

const categoriesEndpoint = 'coins/categories';
const coinsEndpoint = 'coins/markets';
const trendingEndpoint = 'search/trending';

const coingeckoService = {
  getCategories: async () => {
    const { data } = await http.get(categoriesEndpoint);
    return data;
  },
  getCoins: async () => {
    const { data } = await http.get(coinsEndpoint, {
      params: {
        vs_currency: 'usd',
        per_page: 250
        // page: 3,
      }
    });

    return data;
  },
  getTrending: async () => {
    const { data } = await http.get(trendingEndpoint);

    return data;
  }
};
export default coingeckoService;
