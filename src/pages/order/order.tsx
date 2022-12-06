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

const OrderPage = () => {
  const dispatch = useAppDispatch();

  const { wsConnected: wsFeedConnected } = useAppSelector(
    (state) => state.wsFeed
  );
  const { wsConnected: wsOrdersConnected } = useAppSelector(
    (state) => state.wsOrders
  );

  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START });
    dispatch({ type: WS_ORDERS_CONNECTION_START });

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
