import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { API } from '../../constants';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { DataContext } from '../../services/dataContext';
import { ConstructorContext } from '../../services/constructorContext';
import { OrdersContext } from '../../services/ordersContext';

const App = () => {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [constructor, setConstructor] = useState([]);
  const [isConstructor, setIsConstructor] = useState(true);
  const ordersState = useState([]);

  useEffect(() => {
    fetch(API + 'ingredients')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Ошибка ${response.status}`);
      })
      .then((result) => {
        const { data } = result;
        setData(data);
        setDataLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    let ingredients = [];
    data.forEach((el) => {
      if (el.type !== 'bun') {
        ingredients.push(el);
      } else {
        if (ingredients.findIndex((el) => el.type === 'bun') === -1) {
          ingredients.push(el);
        }
      }
    });

    setConstructor(ingredients);

    if (ingredients !== []) setIsConstructor(true);
  }, [data, setConstructor, setIsConstructor]);

  return (
    <div className={styles.app}>
      <OrdersContext.Provider value={ordersState}>
        <AppHeader />
        {!dataLoading ? (
          <main className={styles.main}>
            <section className={`${styles.section} ml-5 mr-5`}>
              <DataContext.Provider value={data}>
                <BurgerIngredients />
              </DataContext.Provider>
            </section>
            <section className={`${styles.section} mt-25 ml-5 mr-5`}>
              <ConstructorContext.Provider value={constructor}>
                {isConstructor && <BurgerConstructor />}
              </ConstructorContext.Provider>
            </section>
          </main>
        ) : (
          <p
            className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
          >
            Загрузка данных...
          </p>
        )}
      </OrdersContext.Provider>
    </div>
  );
};

export default App;
