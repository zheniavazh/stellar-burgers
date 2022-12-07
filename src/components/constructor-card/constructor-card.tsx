import { useRef } from 'react';
import styles from './constructor-card.module.css';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_INGREDIENT } from '../../services/actions/constructorIngredients';
import { DECREASE_COUNT } from '../../services/actions/ingredients';
import { BUN } from '../../constants';
import { TIngredient } from '../../utils/types';
import { useAppDispatch } from '../../index';

type TConstructorCardProps = {
  type?: 'top' | 'bottom';
  isLocked: boolean;
  ingredient: TIngredient;
  index?: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
};

const ConstructorCard = ({
  type,
  isLocked,
  ingredient,
  index,
  moveCard,
}: TConstructorCardProps) => {
  const dispatch = useAppDispatch();

  let text = ingredient.name;
  if (type === 'top') {
    text = `${ingredient.name} (верх)`;
  } else if (type === 'bottom') {
    text = `${ingredient.name} (низ)`;
  }

  const ref = useRef<HTMLDivElement>(null);

  const [{ opacity }, drag] = useDrag({
    type: 'card',
    item: (item: any) => ({ id: item.dragId, index }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset !== null) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (hoverIndex !== undefined) {
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          moveCard && moveCard(dragIndex, hoverIndex);
          item.index = hoverIndex;
        }
      }
    },
  });

  if (ingredient.type !== BUN) drag(drop(ref));

  const handleClose = (payload: TIngredient) => {
    dispatch({ type: DELETE_INGREDIENT, payload });
    dispatch({ type: DECREASE_COUNT, payload });
  };

  return (
    <div
      className={`${styles.constructorCard} ${
        type === undefined ? 'mr-2' : 'mr-8'
      }`}
      style={{ opacity }}
      ref={type === undefined ? ref : null}
      onDrop={(e) => e.preventDefault()}
      data-handler-id={handlerId}>
      {type === undefined && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleClose(ingredient)}
      />
    </div>
  );
};

export default ConstructorCard;
