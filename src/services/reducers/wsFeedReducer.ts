import { TWSOrder } from '../../utils/types';
import {
  TWSFeedActions,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_ORDERS,
} from '../actions/wsFeedActions';

type TIinitialState = {
  wsConnected: boolean;
  orders: Array<TWSOrder>;
  total: number;
  totalToday: number;
};

export const initialState: TIinitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsFeedReducer = (state = initialState, action: TWSFeedActions) => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
      };
    case WS_FEED_GET_ORDERS:
      const { orders, total, totalToday } = action.payload;
      return {
        ...state,
        orders: [...orders],
        total: total,
        totalToday: totalToday,
      };
    default:
      return state;
  }
};
