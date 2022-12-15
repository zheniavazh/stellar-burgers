import { wsOrdersReducer, initialState } from './wsOrdersReducer';
import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_ORDERS,
} from '../actions/wsOrdersActions';

describe('WSOrders reducer', () => {
  it('Should return the initial state', () => {
    expect(wsOrdersReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle WS_ORDERS_CONNECTION_SUCCESS', () => {
    expect(
      wsOrdersReducer(initialState, {
        type: WS_ORDERS_CONNECTION_SUCCESS,
      })
    ).toEqual({ ...initialState, wsConnected: true }, initialState);
  });

  it('Should handle WS_ORDERS_CONNECTION_ERROR', () => {
    expect(
      wsOrdersReducer(initialState, {
        type: WS_ORDERS_CONNECTION_ERROR,
      })
    ).toEqual(initialState, initialState);
  });

  it('Should handle WS_ORDERS_CONNECTION_CLOSED', () => {
    expect(
      wsOrdersReducer(
        {
          ...initialState,
          orders: ['Order'],
        },
        {
          type: WS_ORDERS_CONNECTION_CLOSED,
        }
      )
    ).toEqual(initialState, {
      ...initialState,
      orders: ['Order'],
    });
  });

  it('Should handle WS_ORDERS_GET_ORDERS', () => {
    expect(
      wsOrdersReducer(
        { ...initialState, wsConnected: true },
        {
          type: WS_ORDERS_GET_ORDERS,
          payload: {
            orders: ['Order'],
          },
        }
      )
    ).toEqual(
      {
        wsConnected: true,
        orders: ['Order'],
      },
      {
        ...initialState,
        wsConnected: true,
      }
    );
  });
});
