import { useState } from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorCard from '../constructor-card/constructor-card';
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const orderNumber = '034536';

const BurgerConstructor = ({ data }) => {
  const [isModal, setIsModal] = useState(false);

  const handlerOpenModal = () => {
    setIsModal(true);
  };

  return (
    <>
      <section className={`${styles.section} mt-25 ml-5 mr-5`}>
        <div className={styles.constructor}>
          {data && (
            <ConstructorCard
              type={'top'}
              isLocked={true}
              ingredient={data[0]}
            />
          )}
          <div className={`${styles.constructorWrap} ml-2 custom-scroll`}>
            {data &&
              data
                .filter((el) => el !== data[0])
                .map((item) => (
                  <ConstructorCard
                    key={item._id}
                    isLocked={false}
                    ingredient={item}
                  />
                ))}
          </div>
          {data && (
            <ConstructorCard
              type={'bottom'}
              isLocked={true}
              ingredient={data[0]}
            />
          )}
        </div>
        <div className={`${styles.total} mt-10 mr-4`}>
          <div className={`${styles.price} mr-10`}>
            <span className="text text_type_digits-medium mr-2">610</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handlerOpenModal}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      <Modal isModal={isModal} setIsModal={setIsModal}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
    </>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType),
};

export default BurgerConstructor;
