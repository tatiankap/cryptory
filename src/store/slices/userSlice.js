import { createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import { localStorageService } from '../../services/localStorage.service';
import userService from '../../services/user.service';
import { generateAuthError } from '../../utils/generateAuthError';
import { toast } from 'react-toastify';
import { HOME_ROUTE } from '../../utils/routes';

const initialState = localStorageService.getAccessToken()
  ? {
      name: '',
      entities: null,
      userId: localStorageService.getUserId(),
      isLoggedIn: false,
      error: null,
      favoritesList: []
    }
  : {
      name: '',
      entities: null,
      userId: '',
      isLoggedIn: false,
      error: null
    };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.name = action.payload.displayName;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
    },
    setUserData: (state, action) => {
      const favorites = action.payload.favorites
        ? Object.values(action.payload.favorites)
        : [];
      const assets = action.payload.assets
        ? Object.values(action.payload.assets)
        : [];
      state.entities = { ...action.payload, favorites, assets };
      state.isLoggedIn = true;
      if (!state.name.length) {
        state.name = action.payload.displayName;
      }
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.userId = '';
      state.entities = null;
    },
    setUserDeposit: (state, action) => {
      state.entities = { ...state.entities, ...action.payload };
    },
    setAssets: (state, action) => {
      const asset = action.payload;
      let existingAsset = state.entities.assets.find((a) => a.id === asset.id);
      if (existingAsset) {
        state.entities.assets = state.entities.assets.map((a) =>
          a.id === asset.id ? asset : a
        );
      } else {
        state.entities.assets.push(action.payload);
      }
    },
    setFavoritesCoin(state, action) {
      state.entities.favorites.push(action.payload);
    },
    removedCoinFromFavorites: (state, action) => {
      state.entities.favorites = state.entities?.favorites.filter(
        (f) => f.id !== action.payload
      );
    },
    removedAsset: (state, action) => {
      state.entities.assets = state.entities.assets.filter(
        (a) => a.id !== action.payload
      );
    }
  }
});

const { actions, reducer: userReducer } = userSlice;
export default userReducer;

const {
  setActiveUser,
  setUserData,
  userLoggedOut,
  setUserDeposit,
  setAssets,
  setFavoritesCoin,
  removedCoinFromFavorites,
  removedAsset
} = actions;

export const loadCurrentUserData = () => async (dispatch) => {
  try {
    const { content } = await userService.get();
    dispatch(setUserData(content));
  } catch (error) {
    const { message, name } = error;
    toast.error('Error with load user data', message, name);
  }
};

export const createUser = (payload) => async (dispatch) => {
  try {
    const { content } = await userService.create(payload);
    dispatch(setUserData(content));
  } catch (error) {
    const { message, name } = error;
    toast.error('Error in creating user', message, name);
  }
};

export const signIn = (payload, navigate) => async (dispatch) => {
  try {
    const data = await authService.login(payload);
    localStorageService.setTokens(data);

    dispatch(setActiveUser(data));
    dispatch(loadCurrentUserData(payload));
    toast.success('You have successfully signed in');
    navigate(HOME_ROUTE);
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      toast.error(errorMessage);
    }
  }
};

export const signUp = (payload, navigate) => async (dispatch) => {
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(
      setActiveUser({ userId: data.localId, displayName: data.displayName })
    );

    dispatch(
      createUser({
        _id: data.localId,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${(Math.random() + 1).toString(36).substring(7)}`,
        ...payload
      })
    );
    toast.success('You have successfully signed up');
    navigate(HOME_ROUTE);
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      toast.error(errorMessage);
    }
  }
};

export const logOut = (navigate) => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  toast.success('You have successfully logged out');
  navigate(HOME_ROUTE);
};

export const addUserDeposit = (payload) => async (dispatch) => {
  try {
    const { status, statusText } = await userService.addDeposit(payload);
    if (status === 200 && statusText === 'OK') {
      dispatch(setUserDeposit(payload));
    }
  } catch (error) {
    const { message, name } = error;
    toast.error('Error to add deposit', message, name);
  }
};

export const addUserCoin = (payload) => async (dispatch) => {
  try {
    const { status, statusText } = await userService.addAsset(payload);
    if (status === 200 && statusText === 'OK') {
      dispatch(setAssets(payload));
    }
  } catch (error) {
    const { message, name } = error;
    toast.error('Error to add coin', message, name);
  }
};

export const deleteAsset = (id) => async (dispatch) => {
  try {
    const { status, statusText } = await userService.removeAsset(id);
    if (status === 200 && statusText === 'OK') {
      dispatch(removedAsset(id));
    }
  } catch (error) {
    const { message, name } = error;
    toast.error('Error to delete asset', message, name);
  }
};

export const toggleFavoriteCoin = (coin) => async (dispatch, getState) => {
  const isUserLoggedIn = getState().user.isLoggedIn;
  const isFavorite = getState().user.entities?.favorites?.find(
    (p) => p.id === coin.id
  );
  try {
    if (isUserLoggedIn) {
      if (isFavorite) {
        dispatch(removeCoinFromFavorite(coin.id));
      } else {
        dispatch(addCoinToFavorites(coin));
      }
    } else {
      toast.info('If you want to add to favorite, please sign in');
    }
  } catch (error) {
    const { message, name } = error;
    toast.error('Error to toggle "coin to favorites"', message, name);
  }
};

export const addCoinToFavorites = (payload) => async (dispatch) => {
  try {
    console.log(payload);

    const { status } = await userService.addCoinToFavorite(payload);
    if (status === 200) {
      dispatch(setFavoritesCoin(payload));
    }
  } catch (error) {
    const { message, name } = error;
    toast.error('Error to add coin to favorites', message, name);
  }
};

export const removeCoinFromFavorite = (id) => async (dispatch) => {
  try {
    const { status } = await userService.deleteCoinFromFavorite(id);

    if (status) {
      dispatch(removedCoinFromFavorites(id));
    }
  } catch (error) {
    console.log(error);

    const { message, name } = error;
    toast.error('Error to remove coin from favorite', message, name);
  }
};

export const getUserIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getUserId = () => (state) => state.user.userId;
export const getFavoriteCoin = (id) => (state) =>
  state.user.entities?.favorites?.find((p) => p.id === id);
export const getFavoritesCoins = () => (state) =>
  state.user.entities?.favorites;
