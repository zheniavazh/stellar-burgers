import {
  SHOW_INGREDIENT_MODAL,
  SHOW_ORDER_MODAL,
  HIDE_INGREDIENT_MODAL,
  HIDE_ORDER_MODAL,
} from '../actions/modal';

const initialModalState = {
  isIngredientModal: false,
  isOrderModal: false,
};

export const modalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_MODAL: {
      return {
        ...state,
        isIngredientModal: true,
      };
    }
    case SHOW_ORDER_MODAL: {
      return {
        ...state,
        isOrderModal: true,
      };
    }
    case HIDE_INGREDIENT_MODAL: {
      return {
        ...state,
        isIngredientModal: false,
      };
    }
    case HIDE_ORDER_MODAL: {
      return {
        ...state,
        isOrderModal: false,
      };
    }
    default: {
      return state;
    }
  }
};
