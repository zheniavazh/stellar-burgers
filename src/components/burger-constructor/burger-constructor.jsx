import { useState, useEffect, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import ConstructorCard from '../constructor-card/constructor-card';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  INCREASE_BUN_COUNT,
  INCREASE_COUNT,
  UPDATE_CONSTRUCTOR,
  getOrder,
} from '../../services/actions';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { isConstructor, ingredients, bun, rest } = useSelector(
    (state) => state.constructorIngredients
  );
  const { currentOrder } = useSelector((state) => state.orders);

  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTotalPrice = useCallback(() => {
    let result = ingredients
      .map((el) => (el.type === 'bun' ? el.price * 2 : el.price))
      .reduce((acc, price) => acc + price, 0);
    setTotalPrice(result);
  }, [ingredients, setTotalPrice]);

  const handlerOrder = () => {
    const ingredientsIds = ingredients.map((el) => el._id);
    dispatch(getOrder(ingredientsIds));
    setIsModalOpen(true);
  };

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredients',
    drop(item) {
      dropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const dropHandler = (payload) => {
    if (payload.type === 'bun') {
      dispatch({ type: ADD_BUN, payload });
      dispatch({ type: INCREASE_BUN_COUNT, payload });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { ...payload, dragId: uuidv4() },
      });
      dispatch({ type: INCREASE_COUNT, payload });
    }
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = rest[dragIndex];
      const newCards = [...rest];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: UPDATE_CONSTRUCTOR,
        payload: newCards,
      });
    },
    [rest, dispatch]
  );

  useEffect(() => {
    getTotalPrice();
  }, [ingredients, getTotalPrice]);

  return (
    <>
      <section
        className={`${styles.section} ${
          isHover ? styles.onHover : ''
        } mt-25 ml-5 mr-5`}
        ref={dropTargetRef}
      >
        {isConstructor && (
          <>
            <div className={styles.constructor}>
              {bun && (
                <ConstructorCard
                  type={'top'}
                  isLocked={true}
                  ingredient={bun}
                />
              )}
              <div className={`${styles.constructorWrap} ml-2 custom-scroll`}>
                {rest &&
                  rest.map((item, index) => (
                    <ConstructorCard
                      key={item.dragId}
                      isLocked={false}
                      ingredient={item}
                      index={index}
                      moveCard={moveCard}
                    />
                  ))}
              </div>
              {bun && (
                <ConstructorCard
                  type={'bottom'}
                  isLocked={true}
                  ingredient={bun}
                />
              )}
            </div>
            <div className={`${styles.total} mt-10 mr-4`}>
              <div className={`${styles.price} mr-10`}>
                <span className="text text_type_digits-medium mr-2">
                  {totalPrice}
                </span>
                <CurrencyIcon type="primary" />
              </div>
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={handlerOrder}
              >
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </section>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <OrderDetails number={currentOrder?.number} />
      </Modal>
    </>
  );
};

export default BurgerConstructor;
