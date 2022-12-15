import { useEffect, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import ConstructorCard from '../constructor-card/constructor-card';
import { useDrop } from 'react-dnd';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  UPDATE_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
} from '../../services/actions/constructorIngredients';
import {
  INCREASE_BUN_COUNT,
  INCREASE_COUNT,
  DELETE_COUNT,
} from '../../services/actions/ingredients';
import { getOrder } from '../../services/actions/orders';
import { BUN } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser, updateToken } from '../../services/actions/auth';
import { SHOW_ORDER_MODAL } from '../../services/actions/modal';
import { useAppDispatch, useAppSelector } from '../../index';
import { TIngredient } from '../../utils/types';
import { getTotalPrice } from '../../utils/getTotalPrice';

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isConstructor, constructorIngredients } = useAppSelector(
    (state) => state.constructorIngredients
  );
  const { orderRequest, currentOrder } = useAppSelector(
    (state) => state.orders
  );
  const { currentUser } = useAppSelector((state) => state.auth);

  const bun = constructorIngredients.find((el) => el.type === BUN);
  const rest = constructorIngredients.filter((el) => el.type !== BUN);

  useEffect(() => {
    if (currentOrder) {
      navigate(`/profile/order/${currentOrder.number}`, {
        state: { background: pathname },
      });
    }
  }, [currentOrder, navigate, pathname]);

  const handlerOrder = () => {
    if (bun) {
      if (currentUser) {
        const token = window.localStorage.getItem('expires_in');
        if (token && Date.now() >= Number(token) + 1200 * 1000) {
          dispatch(updateToken());
          dispatch(getUser());
        }
        const ingredientsIds = constructorIngredients.map((el) => el._id);
        dispatch(getOrder(ingredientsIds));
        dispatch({ type: DELETE_CONSTRUCTOR });
        dispatch({ type: DELETE_COUNT });
        dispatch({ type: SHOW_ORDER_MODAL });
      } else {
        navigate('/login', { state: { from: pathname } });
      }
    }
  };

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredients',
    drop(item: any) {
      dropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const dropHandler = (payload: TIngredient) => {
    if (payload.type === BUN) {
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
    (dragIndex: number, hoverIndex: number) => {
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

  return (
    <section
      className={`${styles.section} ${
        isHover ? styles.onHover : ''
      } mt-25 ml-5 mr-5`}
      ref={dropTargetRef}
      data-test-id="constructor">
      {isConstructor && (
        <>
          <div className={`${styles.constructor}`}>
            {bun && (
              <ConstructorCard type={'top'} isLocked={true} ingredient={bun} />
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
          {!bun && (
            <p
              className={`${styles.text} text text_type_main-default text_color_inactive mt-10 mr-4`}>
              Не забудьте добавить булку!
            </p>
          )}
          <div className={`${styles.total} mt-10 mr-4`}>
            <div className={`${styles.price} mr-10`}>
              <span className="text text_type_digits-medium mr-2">
                {getTotalPrice(constructorIngredients)}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={handlerOrder}>
              Оформить заказ
            </Button>
          </div>
        </>
      )}
      {orderRequest && !currentOrder && (
        <p
          className={`${styles.text} text text_type_main-default text_color_inactive mt-10 mr-4`}>
          Подождите, пожалуйста, идёт отправка данных...
        </p>
      )}
    </section>
  );
};

export default BurgerConstructor;
