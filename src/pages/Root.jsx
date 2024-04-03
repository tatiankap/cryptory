import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadCurrentUserData, getUserId } from '../store/slices/userSlice';
import { useCrypto } from '../hooks/useCrypto';
import { ConfigProvider, Spin } from 'antd';
import { loadCrypto } from '../store/slices/cryptoSlice';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

export default function Root() {
  const dispatch = useDispatch();
  const { coins = [] } = useCrypto();
  const isUserAuth = useSelector(getUserId());

  useEffect(() => {
    if (isUserAuth) {
      dispatch(loadCurrentUserData());
      // redirect('/')
    }
    dispatch(loadCrypto());
    // dispatch(loadCoinsList());
    // dispatch(loadCategoriesList());
    // dispatch()
  }, []);

  if (!coins.length) {
    return (
      <Spin
        size="large"
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            colorPrimary: '#fff',
            colorText: '#b8bec4',
            colorBgContainer: '#4e3cb9'
          },
          Table: {
            colorTextHeading: '#000',
            colorText: '#000'
          },
          Button: {
            colorBorder: '#4e3cb9',
            colorInfoText: '#4e3cb9'
          },
          Menu: {
            colorPrimary: '#001529'
          },
          Form: {
            colorTextHeading: '#000'
          }
        },
        token: {
          borderRadius: 10,
          colorTextHeading: '#fff'
        }
      }}
    >
      <Header />
      <ToastContainer />
      <Outlet />
    </ConfigProvider>
  );
}
