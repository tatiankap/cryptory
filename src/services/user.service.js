import { localStorageService } from './localStorage.service';
import httpService from './http.service';
const userEndpoint = 'users/';

const userService = {
  get: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  addDeposit: async (payload) => {
    const data = await httpService.put(
      userEndpoint + localStorageService.getUserId() + '/deposit',
      payload.deposit
    );
    return data;
  },
  addCoinToFavorite: async (payload) => {
    const data = await httpService.put(
      userEndpoint +
        localStorageService.getUserId() +
        '/favorites/' +
        payload.id,
      payload
    );
    return data;
  },
  deleteCoinFromFavorite: async (id) => {
    const data = await httpService.delete(
      userEndpoint + localStorageService.getUserId() + '/favorites/' + id
    );
    return data;
  },
  addAsset: async (payload) => {
    const data = await httpService.put(
      userEndpoint + localStorageService.getUserId() + '/assets/' + payload.id,
      payload
    );
    return data;
  },
  removeAsset: async (id) => {
    const data = await httpService.delete(
      userEndpoint + localStorageService.getUserId() + '/assets/' + id
    );

    return data;
  }
};

export default userService;
