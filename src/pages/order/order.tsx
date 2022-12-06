import { useEffect } from 'react';
import styles from './order.module.css';
import FeedOrderDetails from '../../components/feed-order-details/feed-order-details';
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
} from '../../services/actions/wsFeedActions';
import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_CLOSED,
} from '../../services/actions/wsOrdersActions';
import { useAppDispatch, useAppSelector } from '../../index';
import { updateToken } from '../../services/actions/auth';

const OrderPage = () => {
  const dispatch = useAppDispatch();

  const { wsConnected: wsFeedConnected } = useAppSelector(
    (state) => state.wsFeed
  );
  const { wsConnected: wsOrdersConnected } = useAppSelector(
    (state) => state.wsOrders
  );

  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START, payload: '/all' });
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

    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
      dispatch({ type: WS_ORDERS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return wsFeedConnected && wsOrdersConnected ? (
    <div className={`${styles.container} pb-20`}>
      <FeedOrderDetails isPage={true} isProfile={true} />
    </div>
  ) : (
    <p
      className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
      Загрузка данных...
    </p>
  );
};

export default OrderPage;
