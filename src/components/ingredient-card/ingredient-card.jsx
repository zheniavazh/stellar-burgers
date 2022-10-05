import { useState } from 'react';
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const modalTitle = 'Детали ингредиента';

const IngredientCard = ({ ingredient, count }) => {
  const [isModal, setIsModal] = useState(false);

  const handlerOpenModal = () => {
    setIsModal(true);
  };

  return (
    <>
      <div className={`${styles.card} mb-8`} onClick={handlerOpenModal}>
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
        <Counter count={count} size="default" />
      </div>
      <Modal isModal={isModal} setIsModal={setIsModal} modalTitle={modalTitle}>
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    </>
  );
};

IngredientCard.propTypes = {
  ingredient: ingredientType,
  count: PropTypes.number,
};

export default IngredientCard;
