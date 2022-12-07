import styles from './feed-order-details.module.css';
import { useParams } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  sortIngredientsWithCount,
  sortIngredientsWithoutCount,
} from '../../utils/sortIngredients';
import { useAppSelector } from '../../index';
import { getTotalPrice } from '../../utils/getTotalPrice';
import { getStatus } from '../../utils/getStatus';

type TFeedOrderDetailsProps = {
  isPage?: boolean;
  isProfile?: boolean;
};

const FeedOrderDetails = ({ isPage, isProfile }: TFeedOrderDetailsProps) => {
  const { orderId } = useParams();

  const { ingredients } = useAppSelector((state) => state.ingredients);
  const { orders: feedOrders } = useAppSelector((state) => state.wsFeed);
  const { orders } = useAppSelector((state) => state.wsOrders);

  const order = isProfile
    ? orders.filter((el) => el._id === orderId)[0]
    : feedOrders.filter((el) => el._id === orderId)[0];

  return (
    order && (
      <div className={styles.details}>
        <p
          className={`${
            isPage && styles.textAlign
          } text text_type_digits-default`}>
          #0{order.number}
        </p>
        <p className="text text_type_main-medium mt-10 mb-3">{order.name}</p>
        <p
          className={`${
            order.status === 'done' && styles.textColor
          } text text_type_main-default`}>
          {getStatus(order.status)}
        </p>
        <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
        <div className={`${styles.ingredients} pr-5 mb-10 custom-scroll`}>
          {sortIngredientsWithCount(ingredients, order.ingredients).map(
            (ingredient, index) => (
              <div className={styles.ingredientsWrap} key={index}>
                <div className={`${styles.ingredientsLeft}`}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${ingredient.image})`,
                    }}></div>
                  <p className="text text_type_main-default ml-4">
                    {ingredient.name}
                  </p>
                </div>
                <div className={styles.ingredientsRight}>
                  <p className="text text_type_digits-default mr-2">
                    {`${ingredient.count} x ${ingredient.price}`}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            )
          )}
        </div>
        <div className={styles.bottom}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
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
    )
  );
};

export default FeedOrderDetails;
