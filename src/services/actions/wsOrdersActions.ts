import { TWSOrders } from '../../utils/types';
export const WS_ORDERS_CONNECTION_START: 'WS_ORDERS_CONNECTION_START' =
  'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_SUCCESS: 'WS_ORDERS_CONNECTION_SUCCESS' =
  'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR: 'WS_ORDERS_CONNECTION_ERROR' =
  'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' =
  'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_GET_ORDERS: 'WS_ORDERS_GET_ORDERS' =
  'WS_ORDERS_GET_ORDERS';

type TWSOrdersConnectionStartAction = {
  readonly type: typeof WS_ORDERS_CONNECTION_START;
};

type TWSOrdersConnectionSuccessAction = {
  readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
};

type TWSOrdersConnectionErrorAction = {
  readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
};

type TWSOrdersConnectionClosedAction = {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
};

type TWSOrdersGetOrdersAction = {
  readonly type: typeof WS_ORDERS_GET_ORDERS;
  readonly payload: TWSOrders;
};

export type TWSOrdersActions =
  | TWSOrdersConnectionStartAction
  | TWSOrdersConnectionSuccessAction
  | TWSOrdersConnectionErrorAction
  | TWSOrdersConnectionClosedAction
  | TWSOrdersGetOrdersAction;
