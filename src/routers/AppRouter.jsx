import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from 'react-router-dom';
import Error from '../pages/Error';
import Root from '../pages/Root';
import { getUserId } from '../services/localStorage.service';
import { authRoutes, publicRoutes, adminRoutes } from './routes';
import { Spin } from 'antd';
import RootAdmin from '../pages/RootAdmin';

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      id: 'root',
      path: '/',
      element: <Root />,
      errorElement: <Error />,
      children: publicRoutes
    },
    {
      path: '/',
      element: <Root />,
      errorElement: <Error />,
      loader: () => {
        if (!getUserId()) {
          return redirect('/login');
        }
        return null;
      },
      children: authRoutes
    },
    {
      path: '/admin',
      element: <RootAdmin />,
      errorElement: <Error />,
      // loader: () => {
      //   if (!getAdminId()) {
      //     // console.log('is user admin in', getAdmin())
      //     // return redirect('/admin')
      //   }
      //   return null;
      // },
      children: adminRoutes
    }
  ]);
  return (
    <RouterProvider router={router} fallbackElement={<Spin size="large" />} />
  );
}
