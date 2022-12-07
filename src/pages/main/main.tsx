import styles from './main.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../index';

const MainPage = () => {
  const { ingredientsRequest, ingredientsError } = useAppSelector(
    (state) => state.ingredients
  );

  return !ingredientsRequest && !ingredientsError ? (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  ) : (
    <p
      className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
      Загрузка данных...
    </p>
  );
};

export default MainPage;
