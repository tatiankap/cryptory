import httpService from './http.service';

const coinsEndpoint = '/coins';
const categoriesEndpoint = '/categories';
const trendingEndpoint = '/trending';

const cryptoService = {
  fetchCoins: async () => {
    const { data } = await httpService.get(coinsEndpoint);
    return data;
  },
  fetchCategories: async () => {
    const { data } = await httpService.get(categoriesEndpoint);
    return data;
  },
  fetchTrending: async () => {
    const { data } = await httpService.get(trendingEndpoint);
    return data;
  }
};

export default cryptoService;
