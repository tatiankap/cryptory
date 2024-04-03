import Dashboard from '../pages/Dashboard/Dashboard';
import {
  USER_ROUTE,
  FAVORITES_ROUTE,
  COINS_ROUTE,
  CATEGORIES_ROUTE
} from '../utils/routes';
import Account from '../pages/Account/Account';
import Login from '../pages/Login';
import { getUserId } from '../services/localStorage.service';
import { redirect } from 'react-router-dom';
import Coins from '../components/Dashboard/Coins';
import Home from '../components/Dashboard/Home';
import Categories from '../components/Dashboard/Categories';
import Admin from '../pages/Admin/Admin';
import Favorites from '../components/Dashboard/Favorites';
import CoinCard from '../components/User/AccountInfo/CoinCard';

export const publicRoutes = [
  {
    path: '/',
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: COINS_ROUTE,
        Component: Coins,
        children: [
          {
            path: ':coinId',
            Component: CoinCard
          }
        ]
      },
      {
        path: CATEGORIES_ROUTE,
        Component: Categories
      },
      {
        path: FAVORITES_ROUTE,
        Component: Favorites
      }
    ]
  },

  {
    path: '/login',
    loader: () => {
      if (getUserId()) {
        return redirect('/');
      }
      return null;
    },
    Component: Login
  }
];

export const authRoutes = [
  {
    path: USER_ROUTE + '/:userId',
    Component: Account
  }
];

export const adminRoutes = [
  {
    index: true,
    Component: Admin
  }
];

// export const adminRoutes = [
// 	{
// 		path: SHOP_ROUTE,
// 		Component: Admin,
// 	},
// 	{
// 		path: ORDERS_ROUTE,
// 		Component: Orders,
// 	},
// 	{
// 		path: CATALOG_ROUTE,
// 		Component: Devices
// 	},
// 	{
// 		path: DEVICE_ROUTE + '/:deviceId',
// 		Component: Devices
// 	},
// 	{
// 		path: ADD_ROUTE,
// 		Component: AddProducts
// 	},
// 	{
// 		path: LOG_OUT,
// 		Component: LogOut,
// 	},
// ];

// export const authRoutes = [
// 	{
// 		path: USER_ROUTE + '/:userId',
// 		Component: User,
// 	},
// 	{
// 		path: LOG_OUT,
// 		Component: LogOut,
// 	},
// ];

// export const publicRoutes = [
// 	{
// 		path: SHOP_ROUTE,
// 		Component: Main,
// 	},
// 	{
// 		path: DEVICE_ROUTE + '/:category?/:deviceId?',
// 		Component: Devices

// 	},
// 	{
// 		path: LOGIN_ROUTE,
// 		Component: Login,
// 	},
// 	{
// 		path: REGISTRATION_ROUTE,
// 		Component: Login,
// 	},
// 	{
// 		path: BASKET_ROUTE,
// 		Component: Basket,
// 	},
// 	{
// 		path: ADMIN_ROUTE,
// 		Component: Admin,
// 	},
// 	{
// 		path: FAVORITE_ROUTE,
// 		Component: Favorite
// 	}
// ];
