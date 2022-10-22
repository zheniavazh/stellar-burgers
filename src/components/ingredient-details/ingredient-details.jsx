import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const { currentIngredient } = useSelector((state) => state.ingredients);

  return (
    <div className={styles.details}>
      <img srcSet={currentIngredient.image} alt={currentIngredient.name} />
      <p className="text text_type_main-medium mt-4 mb-8">
        {currentIngredient.name}
      </p>
      <div className={styles.detailsWrap}>
        <div className={styles.detailsItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient.calories}
          </span>
        </div>
        <div className={styles.detailsItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient.proteins}
          </span>
        </div>
        <div className={styles.detailsItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient.fat}
          </span>
        </div>
        <div className={styles.detailsItem}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <span className="text text_type_digits-default text_color_inactive">
            {currentIngredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
