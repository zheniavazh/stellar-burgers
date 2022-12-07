import styles from './feed-order.module.css';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../index';
import { TWSOrder } from '../../utils/types';
import { getTotalPrice } from '../../utils/getTotalPrice';
import { sortIngredientsWithoutCount } from '../../utils/sortIngredients';
import { getStatus } from '../../utils/getStatus';

type TFeedOrderProps = {
  order: TWSOrder;
  onModalOpen: (_id: string) => void;
  isProfile?: boolean;
};

const FeedOrder = ({ order, onModalOpen, isProfile }: TFeedOrderProps) => {
  const { ingredients } = useAppSelector((state) => state.ingredients);

  return (
    <div
      className={`${styles.item} pt-6 pb-6 pl-6 pr-6 mb-4`}
      key={order._id}
      onClick={() => onModalOpen(order._id)}>
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
