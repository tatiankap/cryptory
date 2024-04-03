import httpService from './http.service';

const coinsEndpoint = 'coins/';

const coinsService = {
  fetch: async () => {
    const { data } = await httpService.get(coinsEndpoint);
    return data;
  }
};

export default coinsService;
