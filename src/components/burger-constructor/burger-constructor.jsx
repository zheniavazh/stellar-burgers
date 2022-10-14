import { useState, useEffect, useContext, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { API } from '../../constants';
import ConstructorCard from '../constructor-card/constructor-card';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ConstructorContext } from '../../services/constructorContext';
import { OrdersContext } from '../../services/ordersContext';

const BurgerConstructor = () => {
  const ingredients = useContext(ConstructorContext);
  const bun = ingredients.find((el) => el.type === 'bun');
  const rest = ingredients.filter((el) => el.type !== 'bun');

  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useContext(OrdersContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTotalPrice = useCallback(() => {
    let result = ingredients
      .map((el) => (el.type === 'bun' ? el.price * 2 : el.price))
      .reduce((acc, price) => acc + price, 0);
    setTotalPrice(result);
  }, [ingredients, setTotalPrice]);

  useEffect(() => {
    getTotalPrice();
  }, [ingredients, getTotalPrice]);

  const handlerOrder = () => {
    const ingredientsIds = ingredients.map((el) => el._id);
    fetch(API + 'orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Ошибка ${response.status}`);
      })
      .then((result) => {
        const { number } = result.order;
        setOrders([...orders, number]);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className={styles.constructor}>
        {bun && (
          <ConstructorCard type={'top'} isLocked={true} ingredient={bun} />
        )}
        <div className={`${styles.constructorWrap} ml-2 custom-scroll`}>
          {rest &&
            rest.map((item) => (
              <ConstructorCard
                key={item._id}
                isLocked={false}
                ingredient={item}
              />
            ))}
        </div>
        {bun && (
          <ConstructorCard type={'bottom'} isLocked={true} ingredient={bun} />
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
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <OrderDetails orderNumber={orders[orders.length - 1]} />
      </Modal>
    </>
  );
};

export default BurgerConstructor;
