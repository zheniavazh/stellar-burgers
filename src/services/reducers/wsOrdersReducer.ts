import { TWSOrder } from '../../utils/types';
import {
  TWSOrdersActions,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_ORDERS,
} from '../actions/wsOrdersActions';

type TIinitialState = {
  wsConnected: boolean;
  orders: Array<TWSOrder>;
};

export const initialState: TIinitialState = {
  wsConnected: false,
  orders: [],
};

export const wsOrdersReducer = (
  state = initialState,
  action: TWSOrdersActions
) => {
  switch (action.type) {
    case WS_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        orders: [],
      };
    case WS_ORDERS_GET_ORDERS:
      const { orders } = action.payload;
      return {
        ...state,
        orders: [...orders],
      };
    default:
      return state;
  }
};
