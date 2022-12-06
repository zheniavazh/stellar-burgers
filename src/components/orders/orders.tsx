import { useEffect } from 'react';
import styles from './orders.module.css';
import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_START,
} from '../../services/actions/wsOrdersActions';
import FeedOrder from '../feed-order/feed-order';
import { useAppDispatch, useAppSelector } from '../../index';
import { updateToken } from '../../services/actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { SHOW_FEED_ORDER_MODAL } from '../../services/actions/modal';

const Orders = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { wsConnected, orders } = useAppSelector((state) => state.wsOrders);

  useEffect((): any => {
    let accessToken;
    const token = window.localStorage.getItem('expires_in');
    if (token && Date.now() >= Number(token) + 1200 * 1000) {
      dispatch(updateToken());
      accessToken = window.localStorage.getItem('token');
      dispatch({
        type: WS_ORDERS_CONNECTION_START,
        payload: `?token=${accessToken}`,
      });
    } else {
      accessToken = window.localStorage.getItem('token');
      dispatch({
        type: WS_ORDERS_CONNECTION_START,
        payload: `?token=${accessToken}`,
      });
    }

    return () => dispatch({ type: WS_ORDERS_CONNECTION_CLOSED });
  }, [dispatch]);

  const handlerOpenModal = (orderId: string) => {
    dispatch({ type: SHOW_FEED_ORDER_MODAL });
    navigate(`/profile/orders/${orderId}`, {
      state: { background: pathname },
    });
  };

  return wsConnected ? (
    <div className={`${styles.container} pr-2 custom-scroll`}>
      {orders.map((order) => (
        <FeedOrder
          order={order}
          onModalOpen={handlerOpenModal}
          isProfile={true}
          key={order._id}
        />
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
