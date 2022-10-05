import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { burgerConstructor } from '../../utils/data';

const API = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const { data } = result;
        setData(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />

        {/* Здесь пока не передаю данные с сервера, так как тогда конструктор ломается, видимо из-за двух разных булок одновременно */}
        <BurgerConstructor data={burgerConstructor} />
      </main>
    </div>
  );
};

export default App;
