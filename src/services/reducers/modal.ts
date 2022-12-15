import { TModalActions } from '../actions/modal';
import {
  SHOW_INGREDIENT_MODAL,
  SHOW_ORDER_MODAL,
  SHOW_FEED_ORDER_MODAL,
  HIDE_INGREDIENT_MODAL,
  HIDE_ORDER_MODAL,
  HIDE_FEED_ORDER_MODAL,
} from '../actions/modal';

type TInitialModalState = {
  isIngredientModal: boolean;
  isOrderModal: boolean;
  isFeedOrderModal: boolean;
};

export const initialModalState: TInitialModalState = {
  isIngredientModal: false,
  isOrderModal: false,
  isFeedOrderModal: false,
};

export const modalReducer = (
  state = initialModalState,
  action: TModalActions
) => {
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
    case SHOW_FEED_ORDER_MODAL: {
      return {
        ...state,
        isFeedOrderModal: true,
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
    case HIDE_FEED_ORDER_MODAL: {
      return {
        ...state,
        isFeedOrderModal: false,
      };
    }
    default: {
      return state;
    }
  }
};
