import { wsFeedReducer, initialState } from './wsFeedReducer';
import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_ORDERS,
} from '../actions/wsFeedActions';

describe('WSFeed reducer', () => {
  it('Should return the initial state', () => {
    expect(wsFeedReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle WS_FEED_CONNECTION_SUCCESS', () => {
    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_CONNECTION_SUCCESS,
      })
    ).toEqual({ ...initialState, wsConnected: true }, initialState);
  });

  it('Should handle WS_FEED_CONNECTION_ERROR', () => {
    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_CONNECTION_ERROR,
      })
    ).toEqual(initialState, initialState);
  });

  it('Should handle WS_FEED_CONNECTION_CLOSED', () => {
    expect(
      wsFeedReducer(
        {
          wsConnected: true,
          orders: ['Order'],
          total: 1,
          totalToday: 1,
        },
        {
          type: WS_FEED_CONNECTION_CLOSED,
        }
      )
    ).toEqual(initialState, {
      wsConnected: true,
      orders: ['Order'],
      total: 1,
      totalToday: 1,
    });
  });

  it('Should handle WS_FEED_GET_ORDERS', () => {
    expect(
      wsFeedReducer(
        { ...initialState, wsConnected: true },
        {
          type: WS_FEED_GET_ORDERS,
          payload: {
            orders: ['Order'],
            total: 1,
            totalToday: 1,
          },
        }
      )
    ).toEqual(
      {
        wsConnected: true,
        orders: ['Order'],
        total: 1,
        totalToday: 1,
      },
      { ...initialState, wsConnected: true }
    );
  });
});
