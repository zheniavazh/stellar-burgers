import { useRef } from 'react';
import styles from './constructor-card.module.css';
import PropTypes from 'prop-types';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_INGREDIENT } from '../../services/actions/constructorIngredients';
import { DECREASE_COUNT } from '../../services/actions/ingredients';

const ConstructorCard = ({ type, isLocked, ingredient, index, moveCard }) => {
  const dispatch = useDispatch();

  let text = ingredient.name;
  if (type === 'top') {
    text = `${ingredient.name} (верх)`;
  } else if (type === 'bottom') {
    text = `${ingredient.name} (низ)`;
  }

  const ref = useRef(null);

  const [{ opacity }, drag] = useDrag({
    type: 'card',
    item: (item) => ({ id: item.dragId, index }),
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
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  if (ingredient.type !== 'bun') drag(drop(ref));

  const handleClose = (payload) => {
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
      data-handler-id={handlerId}
    >
      {type === undefined && <DragIcon />}
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

ConstructorCard.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  ingredient: ingredientType.isRequired,
  index: PropTypes.number,
  moveCard: PropTypes.func,
};

export default ConstructorCard;
