import { useEffect } from 'react';
import styles from './feed.module.css';
import FeedOrder from '../../components/feed-order/feed-order';
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
} from '../../services/actions/wsFeedActions';
import { useAppDispatch, useAppSelector } from '../../index';
import { useLocation, useNavigate } from 'react-router-dom';
import { SHOW_FEED_ORDER_MODAL } from '../../services/actions/modal';

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { wsConnected, orders, total, totalToday } = useAppSelector(
    (state) => state.wsFeed
  );

  useEffect((): any => {
    dispatch({ type: WS_FEED_CONNECTION_START, payload: '/all' });

    return () => dispatch({ type: WS_FEED_CONNECTION_CLOSED });
  }, [dispatch]);

  const handlerOpenModal = (orderId: string) => {
    dispatch({ type: SHOW_FEED_ORDER_MODAL });
    navigate(`/feed/${orderId}`, {
      state: { background: pathname },
    });
  };

  return wsConnected ? (
    <main className={`${styles.main} pb-10`}>
      <section className={styles.sectionLeft}>
        <p className="text text_type_main-large mt-10 mb-5 ml-1">
          Лента заказов
        </p>
        <div className={`${styles.container} pr-2 custom-scroll`}>
          {orders.map((order) => (
            <FeedOrder
              order={order}
              onModalOpen={handlerOpenModal}
              key={order._id}
            />
          ))}
        </div>
      </section>
      <section className={`${styles.sectionRight} mt-25 ml-15`}>
        <div className={styles.top}>
          <div className={styles.column}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <div className="mb-15">
              {orders.slice(0, 10).map((order) => (
                <p
                  className={`${styles.textColor} text text_type_digits-default mb-2 mr-4`}
                  key={order.number}>
                  {order.status === 'done' && `0${order.number}`}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.column}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            <div className={`${styles.textWrap} mb-15`}>
              {orders.slice(0, 10).map((order) => (
                <p
                  className="text text_type_digits-default mb-2 mr-4"
                  key={order.number}>
                  {order.status === 'pending' && `0${order.number}`}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-15">
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </section>
    </main>
  ) : (
    <p
      className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
      Загрузка данных...
    </p>
  );
};

export default FeedPage;
