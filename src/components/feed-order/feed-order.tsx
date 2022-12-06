import styles from './feed-order.module.css';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../index';
import { useNavigate, useLocation } from 'react-router-dom';
import { TWSOrder } from '../../utils/types';
import { SHOW_FEED_ORDER_MODAL } from '../../services/actions/modal';
import { getTotalPrice } from '../../utils/getTotalPrice';
import { sortIngredientsWithoutCount } from '../../utils/sortIngredients';
import { getStatus } from '../../utils/getStatus';

type TFeedOrderProps = {
  order: TWSOrder;
  isProfile?: boolean;
};

const FeedOrder = ({ order, isProfile }: TFeedOrderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { ingredients } = useAppSelector((state) => state.ingredients);

  const onOpenModal = (orderId: string) => {
    dispatch({ type: SHOW_FEED_ORDER_MODAL });
    isProfile
      ? navigate(`/profile/orders/${orderId}`, {
          state: { background: pathname },
        })
      : navigate(`/feed/${orderId}`, {
          state: { background: pathname },
        });
  };

  return (
    <div
      className={`${styles.item} pt-6 pb-6 pl-6 pr-6 mb-4`}
      key={uuidv4()}
      onClick={() => onOpenModal(order._id)}>
      <div className={styles.itemTop}>
        <p className="text text_type_digits-default">#0{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <p className="text text_type_main-medium mt-6">{order.name}</p>
      {isProfile && (
        <p
          className={`${
            order.status === 'done' && styles.textColor
          } text text_type_main-default mt-2`}>
          {getStatus(order.status)}
        </p>
      )}
      <div className={`${styles.itemBottom} mt-6`}>
        <div className={styles.imagesWrap}>
          {sortIngredientsWithoutCount(ingredients, order.ingredients)
            .slice(0, 6)
            .map((ingredient, index) => (
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${ingredient.image})`,
                }}
                key={index}>
                {order.ingredients.length > 6 && index === 5 && (
                  <span className="text text_type_main-small">{`+${
                    order.ingredients.length - 6
                  }`}</span>
                )}
              </div>
            ))}
        </div>
        <div className={styles.priceWrap}>
          <p className="text text_type_digits-default mr-2">
            {getTotalPrice(
              sortIngredientsWithoutCount(ingredients, order.ingredients)
            )}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedOrder;
