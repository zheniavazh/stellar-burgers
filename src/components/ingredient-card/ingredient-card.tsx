import styles from './ingredient-card.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { TIngredient } from '../../utils/types';
import { BUN } from '../../constants';

type TIngredientCardProps = {
  ingredient: TIngredient;
  count: number;
  onModalOpen: (_id: string) => void;
};

const IngredientCard = ({
  ingredient,
  count,
  onModalOpen,
}: TIngredientCardProps) => {
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div
      data-test-id={ingredient.type === BUN ? 'bun' : 'ingredient'}
      className={`${styles.card} mb-8`}
      style={{ opacity }}
      onClick={() => onModalOpen(ingredient._id)}
      ref={dragRef}>
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={styles.cardPrice}>
        <p className="text text_type_digits-default mt-2 mb-2 mr-2">
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {ingredient.name}
      </p>
      {count > 0 && <Counter count={count} size="default" />}
    </div>
  );
};

export default IngredientCard;
