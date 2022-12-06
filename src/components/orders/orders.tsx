import { useEffect } from 'react';
import styles from './orders.module.css';
import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_START,
} from '../../services/actions/wsOrdersActions';
import FeedOrder from '../feed-order/feed-order';
import { useAppDispatch, useAppSelector } from '../../index';

const Orders = () => {
  const dispatch = useAppDispatch();
  const { wsConnected, orders } = useAppSelector((state) => state.wsOrders);

  useEffect((): any => {
    dispatch({ type: WS_ORDERS_CONNECTION_START });

    return () => dispatch({ type: WS_ORDERS_CONNECTION_CLOSED });
  }, [dispatch]);

  return wsConnected ? (
    <div className={`${styles.container} pr-2 custom-scroll`}>
      {orders.map((order) => (
        <FeedOrder order={order} key={order._id} isProfile={true} />
      ))}
    </div>
  ) : (
    <p
      className={`${styles.text} text text_type_main-default text_color_inactive`}>
      Загрузка данных...
    </p>
  );
};

export default Orders;
