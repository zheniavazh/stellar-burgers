import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types';
import { useDrag } from 'react-dnd';

const IngredientCard = ({ ingredient, count, onModalOpen }) => {
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div
      className={`${styles.card} mb-8`}
      style={{ opacity }}
      onClick={() => onModalOpen(ingredient)}
      ref={dragRef}
    >
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={styles.cardPrice}>
        <p className="text text_type_digits-default mt-2 mb-2 mr-2">
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {ingredient.name}
      </p>
      {count > 0 && <Counter count={count} size="default" />}
    </div>
  );
};

IngredientCard.propTypes = {
  ingredient: ingredientType,
  count: PropTypes.number,
  onModalOpen: PropTypes.func.isRequired,
};

export default IngredientCard;
