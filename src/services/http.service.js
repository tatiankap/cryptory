import axios from 'axios';
import configFile from '../../config.json';
import { transformData } from '../utils/utils';
import { toast } from 'react-toastify';
import localStorageService from './localStorage.service';
import authService from './auth.service';

const http = axios.create({
  baseURL: configFile.apiEndpoint_FireBase
});

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);

      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
      const expiresDate = localStorageService.getTokenExpiresDate();
      const refreshToken = localStorageService.getRefreshToken();
      if (refreshToken && expiresDate < Date.now()) {
        const data = await authService.refresh();

        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        });
      }
      const accessToken = localStorageService.getAccessToken();
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

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      if (res?.data?.hasOwnProperty('categories')) {
        res.data = { content: res.data };
        return res;
      }
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

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
};
export default httpService;
