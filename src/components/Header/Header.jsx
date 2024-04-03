import { Menu } from 'antd';
import Layout from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/routes';
import logo from '../../assets/logo.svg';
import HeaderUser from './HeaderUser';
import { useSelector } from 'react-redux';
import HeaderSearch from './HeaderSearch';
import { getAdminIsLoggedIn } from '../../store/slices/adminSlice';
import HeaderAdmin from './HeaderAdmin';

export default function Header() {
  const user = useSelector((state) => state.user);
  const admin = useSelector(getAdminIsLoggedIn());

  const items = [
    {
      label: (
        <Link to={HOME_ROUTE}>
          <img src={logo} alt="cryptory" style={{ display: 'block' }} />
        </Link>
      ),
      key: 'home'
    },
    {
      label: <HeaderSearch />,
      key: 'search',
      style: {
        marginLeft: 'auto'
      }
    },
    {
      label: admin ? (
        <HeaderAdmin />
      ) : user?.isLoggedIn ? (
        <HeaderUser />
      ) : (
        <Link to="/login" style={{ marginLeft: 'auto' }}>
          Login
        </Link>
      ),
      key: 'user',
      style: {
        marginLeft: 'auto'
      }
    }
  ];

  return (
    <Layout.Header>
      <Menu
        style={{
          flex: 1,
          minWidth: 0,
          alignItems: 'center',
          display: 'flex'
        }}
        theme="dark"
        mode="horizontal"
        items={items}
      />
    </Layout.Header>
  );
}
