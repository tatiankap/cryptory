import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getAdminIsLoggedIn, getUsers } from '../store/slices/adminSlice';
import { useEffect } from 'react';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';

export default function RootAdmin() {
  const dispatch = useDispatch();
  const isAdminAuth = useSelector(getAdminIsLoggedIn());

  useEffect(() => {
    if (isAdminAuth) {
      dispatch(getUsers());
    }
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
    </>
  );
}
