import { localStorageService } from './localStorage.service';
import configFile from '../../config.json';
import axios from 'axios';
import { toast } from 'react-toastify';
import { transformData } from '../utils/utils';

const httpAdmin = axios.create({
  baseURL: configFile.apiEndpoint_FireBase
});

httpAdmin.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
      const expiresDate = localStorageService.getAdminTokenExpiresDate();
      const refreshToken = localStorageService.getAdminRefreshToken();
      if (refreshToken && expiresDate < Date.now()) {
        const data = await adminService.refresh();

        localStorageService.setAdminTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        });
      }
      const accessToken = localStorageService.getAdminAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpAdmin.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      const { message, name } = error;
      toast.error('Cannot upload data in axios', message, name);
    }
    return Promise.reject(error);
  }
);

const httpAdminAuth = axios.create({
  baseURL: configFile.apiAuthEndpoint_FireBase,
  params: {
    key: import.meta.env.VITE_FIREBASE_KEY
  }
});

const usersEndpoint = 'users/';
const coinsEndpoint = 'coins/';
const trendingEndpoint = 'trending/';
const categoriesEndpoint = 'categories/';

const adminService = {
  login: async ({ email, password }) => {
    const { data } = await httpAdminAuth.post('accounts:signInWithPassword', {
      email,
      password,
      returnSecureToken: true
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAdminAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getAdminRefreshToken()
    });
    return data;
  },
  getUsers: async () => {
    const { data } = await httpAdmin.get(usersEndpoint);
    return data;
  },
  createCategories: async (payload) => {
    const resultsPromise = await Promise.all(
      payload.map(async (category) => {
        const data = await httpAdmin.put(
          categoriesEndpoint + category.id,
          category
        );
        return data;
      })
    );
    return resultsPromise;
  },
  createCoins: async (payload) => {
    const resultsPromise = await Promise.all(
      payload.map(async (coin) => {
        const data = await httpAdmin.put(coinsEndpoint + coin.id, { ...coin });
        return data;
      })
    );
    return resultsPromise;
  },
  createTrending: async (payload) => {
    const data = await httpAdmin.put(trendingEndpoint, payload);
    return data;
  }
};

export default adminService;
