import { TWSOrders } from '../../utils/types';
export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' =
  'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' =
  'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' =
  'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' =
  'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_ORDERS: 'WS_FEED_GET_ORDERS' = 'WS_FEED_GET_ORDERS';

type TWSFeedConnectionStartAction = {
  readonly type: typeof WS_FEED_CONNECTION_START;
};

type TWSFeedConnectionSuccessAction = {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
};

type TWSFeedConnectionErrorAction = {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
};

type TWSFeedConnectionClosedAction = {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
};

type TWSFeedGetOrdersAction = {
  readonly type: typeof WS_FEED_GET_ORDERS;
  readonly payload: TWSOrders;
};

export type TWSFeedActions =
  | TWSFeedConnectionStartAction
  | TWSFeedConnectionSuccessAction
  | TWSFeedConnectionErrorAction
  | TWSFeedConnectionClosedAction
  | TWSFeedGetOrdersAction;
