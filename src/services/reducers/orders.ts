import { TOrdersActions } from '../actions/orders';
import { TOrder } from '../../utils/types';
import {
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  DELETE_CURRENT_ORDER,
} from '../actions/orders';

type TInitialOrdersState = {
  orders: Array<TOrder>;
  currentOrder: TOrder | null;
  orderRequest: boolean;
  orderError: boolean;
};

export const initialOrdersState: TInitialOrdersState = {
  orders: [],
  currentOrder: null,
  orderRequest: false,
  orderError: false,
};

export const ordersReducer = (
  state = initialOrdersState,
  action: TOrdersActions
) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderError: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        currentOrder: { ...action.payload },
        orders: [...state.orders, action.payload],
        orderRequest: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        currentOrder: null,
        orderError: true,
        orderRequest: false,
      };
    }
    case DELETE_CURRENT_ORDER: {
      return {
        ...state,
        currentOrder: null,
      };
    }
    default: {
      return state;
    }
  }
};
