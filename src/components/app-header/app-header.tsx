import styles from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          <div className={styles.navWrap}>
            <NavLink
              to="/"
              end
              className={`${styles.link} pt-4 pb-4 pl-5 pr-5 mr-2`}>
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <BurgerIcon type="primary" />
                  ) : (
                    <BurgerIcon type="secondary" />
                  )}
                  <span
                    className={
                      isActive
                        ? `text text_type_main-default ml-2 ${styles.active}`
                        : 'text text_type_main-default text_color_inactive ml-2'
                    }>
                    Конструктор
                  </span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/feed"
              className={`${styles.link} pt-4 pb-4 pl-5 pr-5`}>
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <ListIcon type="primary" />
                  ) : (
                    <ListIcon type="secondary" />
                  )}
                  <span
                    className={
                      isActive
                        ? `text text_type_main-default ml-2 ${styles.active}`
                        : 'text text_type_main-default text_color_inactive ml-2'
                    }>
                    Лента заказов
                  </span>
                </>
              )}
            </NavLink>
          </div>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <div className={styles.navWrap}>
            <NavLink
              to="/profile"
              className={`${styles.link} ${styles.align} pt-4 pb-4 pl-5 pr-5`}>
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <ProfileIcon type="primary" />
                  ) : (
                    <ProfileIcon type="secondary" />
                  )}
                  <span
                    className={
                      isActive
                        ? `text text_type_main-default ml-2 ${styles.active}`
                        : 'text text_type_main-default text_color_inactive ml-2'
                    }>
                    Личный кабинет
                  </span>
                </>
              )}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
