import styles from './order-details.module.css';
import { useParams } from 'react-router-dom';

import done from '../../images/done.png';

const OrderDetails = () => {
  const { orderNumber } = useParams();

  return (
    <div className={`${styles.details} mt-5 mb-15`}>
      <span className="text text_type_digits-large">{orderNumber}</span>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img src={done} alt="Done" />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
