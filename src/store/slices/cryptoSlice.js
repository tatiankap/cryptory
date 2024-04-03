import { createSlice } from '@reduxjs/toolkit';
import cryptoService from '../../services/crypto.service';
import { toast } from 'react-toastify';

const initialState = {
  coins: null,
  categories: null
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    coinsReceived: (state, action) => {
      state.coins = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTrending: (state, action) => {
      state.trending = action.payload;
    }
  }
});

const { actions, reducer: cryptoReducer } = cryptoSlice;
export default cryptoReducer;

const { coinsReceived, setCategories, setTrending } = actions;

export const loadCoinsList = () => async (dispatch) => {
  try {
    const { content } = await cryptoService.fetchCoins();
    dispatch(coinsReceived(content));
  } catch (error) {
    const { message, name } = error;
    toast.error('Error with load coins list', message, name);
  }
};

export const loadCategoriesList = () => async (dispatch) => {
  try {
    const { content } = await cryptoService.fetchCategories();
    dispatch(setCategories(content));
  } catch (error) {
    const { message, name } = error;
    toast.error('Error with load categories list', message, name);
  }
};

export const loadTrendingList = () => async (dispatch) => {
  try {
    const { content } = await cryptoService.fetchTrending();
    dispatch(setTrending(content));
  } catch (error) {
    const { message, name } = error;
    toast.error('Error with load trending list', message, name);
  }
};

export const loadCrypto = () => async (dispatch) => {
  try {
    dispatch(loadCoinsList());
    dispatch(loadCategoriesList());
    dispatch(loadTrendingList());
  } catch (error) {
    const { message, name } = error;
    toast.error('Error with load crypto list', message, name);
  }
};
