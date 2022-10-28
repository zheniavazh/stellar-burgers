import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const { ingredients } = useSelector((state) => state.ingredients);
  const ingredient = ingredients.find((el) => el._id === ingredientId);

  return (
    ingredient && (
      <div className={styles.details}>
        <img srcSet={ingredient.image} alt={ingredient.name} />
        <p className="text text_type_main-medium mt-4 mb-8">
          {ingredient.name}
        </p>
        <div className={styles.detailsWrap}>
          <div className={styles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Калории,ккал
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </span>
          </div>
          <div className={styles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Белки, г
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </span>
          </div>
          <div className={styles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Жиры, г
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </span>
          </div>
          <div className={styles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Углеводы, г
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default IngredientDetails;
