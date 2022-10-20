import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const dispatch = useDispatch();

  const { ingredientsRequest, ingredientsError } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {!ingredientsRequest && !ingredientsError ? (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      ) : (
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
        >
          Загрузка данных...
        </p>
      )}
    </div>
  );
};

export default App;
