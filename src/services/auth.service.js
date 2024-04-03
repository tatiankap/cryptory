import axios from 'axios';
// import localStorageService from "./localStorage.service";
import config from '../../config.json';
import localStorageService from './localStorage.service';

const httpAuth = axios.create({
  baseURL: config.apiAuthEndpoint_FireBase,
  params: {
    key: 'AIzaSyB57BTUUAjNdLfzdXoy3UImH2JQZpx8bc8'
  }
});

const authService = {
  register: async ({ email, password, displayName }) => {
    const { data } = await httpAuth.post('accounts:signUp', {
      email,
      password,
      displayName,
      returnSecureToken: true
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post('accounts:signInWithPassword', {
      email,
      password,
      returnSecureToken: true
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken()
    });
    return data;
  }
};
export default authService;
