import styles from './profile-nav.module.css';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../services/actions/auth';

const ProfileNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    dispatch(logOut());
    navigate('/login', { replace: true, state: { from: pathname } });
  };

  return (
    <nav className={`${styles.nav} mr-15`}>
      <NavLink
        to="/profile"
        end
        className={`${styles.link} text text_type_main-medium`}
      >
        {({ isActive }) => (
          <span className={isActive ? styles.active : 'text_color_inactive'}>
            Профиль
          </span>
        )}
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={`${styles.link} text text_type_main-medium`}
      >
        {({ isActive }) => (
          <span className={isActive ? styles.active : 'text_color_inactive'}>
            История заказов
          </span>
        )}
      </NavLink>
      <Link
        className={`${styles.link} text text_type_main-medium`}
        onClick={logout}
      >
        <span className="text_color_inactive">Выход</span>
      </Link>
      {pathname === '/profile' && (
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете <br />
          изменить свои персональные данные
        </p>
      )}
      {pathname === '/profile/orders' && (
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      )}
    </nav>
  );
};

export default ProfileNav;
