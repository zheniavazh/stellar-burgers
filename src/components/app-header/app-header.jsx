import styles from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          <div className={styles.navWrap}>
            <a href="/" className={`${styles.link} pt-4 pb-4 pl-5 pr-5 mr-2`}>
              <BurgerIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">
                Конструктор
              </span>
            </a>
            <a href="/" className={`${styles.link} pt-4 pb-4 pl-5 pr-5`}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">
                Лента заказов
              </span>
            </a>
          </div>
          <Logo />
          <div className={styles.navWrap}>
            <a
              href="/"
              className={`${styles.link} ${styles.align} pt-4 pb-4 pl-5 pr-5`}
            >
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">
                Личный кабинет
              </span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
