import styles from './ingredient.module.css';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const IngredientPage = () => {
  return (
    <div className={styles.container}>
      <p className={`${styles.text} text text_type_main-large mb-3`}>
        Детали ингредиента
      </p>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
