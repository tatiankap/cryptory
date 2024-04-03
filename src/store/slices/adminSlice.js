import { createSlice } from '@reduxjs/toolkit';
import { localStorageService } from '../../services/localStorage.service';
import { toast } from 'react-toastify';
import adminService from '../../services/admin.service';
import coingeckoService from '../../services/coingecko.service';

const initialState =
  localStorageService.getAdminAccessToken() && localStorageService.getAdminId()
    ? {
        entities: null,
        adminId: localStorageService.getAdminId(),
        isLoggedIn: true
      }
    : {
        adminId: null,
        isLoggedIn: false
      };

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    authRequestSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.adminId = action.payload;
    },
    adminLoggedOut: (state) => {
      // state.entities = null;
      state.isLoggedIn = false;
      state.adminId = null;
    },
    setUsers: (state, action) => {
      state.entities = { users: action.payload };
    },
    setCategories: () => {
      toast.success('categories added!');
    },
    setCoins: () => {
      toast.success('coins successfully added!');
    },
    setTrending: () => {
      toast.success('trending successfully added!');
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.userId = '';
      state.entities = null;
    }
  }
});

const { actions, reducer: adminReducer } = adminSlice;
export default adminReducer;

const {
  authRequestSuccess,
  setCategories,
  setUsers,
  setCoins,
  setTrending,
  adminLoggedOut
} = actions;

export const signInAdmin = (payload) => async (dispatch) => {
  const { email, password } = payload;
  try {
    const data = await adminService.login({ email, password });
    localStorageService.setAdminTokens(data);
    dispatch(authRequestSuccess(data.localId));
    // history.push(redirect);
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      toast.error('Problem with auth admin', message);
    }
  }
};

export const logOutAdmin = (navigate) => (dispatch) => {
  localStorageService.removeAdminAuthData();
  dispatch(adminLoggedOut());
  navigate('/');
};

export const getUsers = () => async (dispatch) => {
  try {
    const { content } = await adminService.getUsers();
    dispatch(setUsers(content));
  } catch (error) {
    const { message, name } = error;
    toast.error('Cannot load users', message, name);
  }
};

export const uploadCategories = () => async (dispatch) => {
  try {
    const data = await coingeckoService.getCategories();
    const response = await adminService.createCategories(data);
    if (response.length) {
      dispatch(setCategories());
    }
  } catch (error) {
    const { message, name } = error;
    toast.error('Cannot load categories', message, name);
  }
};

export const uploadCoins = () => async (dispatch) => {
  try {
    const data = await coingeckoService.getCoins();
    const response = await adminService.createCoins(data);
    if (response.length) {
      dispatch(setCoins());
    }
  } catch (error) {
    const { message, name } = error;
    toast.error('Cannot load coins', message, name);
  }
};

export const uploadTrending = () => async (dispatch) => {
  try {
    const data = await coingeckoService.getTrending();
    const { status } = await adminService.createTrending(data);
    if (status === 200) {
      dispatch(setTrending());
    }
  } catch (error) {
    const { message, name } = error;
    toast.error('Cannot load trending', message, name);
  }
};

export const getAdminIsLoggedIn = () => (state) =>
  state.admin.isLoggedIn && state.admin.adminId && true;
