import { ordersReducer, initialOrdersState } from './orders';
import {
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  DELETE_CURRENT_ORDER,
} from '../actions/orders';

describe('Orders reducer', () => {
  it('Should return the initial state', () => {
    expect(ordersReducer(undefined, {})).toEqual(initialOrdersState);
  });

  it('Should handle GET_ORDER', () => {
    expect(
      ordersReducer(initialOrdersState, {
        type: GET_ORDER,
      })
    ).toEqual(
      {
        ...initialOrdersState,
        orderRequest: true,
      },
      initialOrdersState
    );
  });

  it('Should handle GET_ORDER_SUCCESS', () => {
    expect(
      ordersReducer(
        {
          ...initialOrdersState,
          orderRequest: true,
        },
        {
          type: GET_ORDER_SUCCESS,
          payload: { _id: 'Order' },
        }
      )
    ).toEqual(
      {
        ...initialOrdersState,
        orders: [{ _id: 'Order' }],
        currentOrder: { _id: 'Order' },
      },
      {
        ...initialOrdersState,
        orderRequest: true,
      }
    );
  });

  it('Should handle GET_ORDER_ERROR', () => {
    expect(
      ordersReducer(
        {
          ...initialOrdersState,
          orderRequest: true,
        },
        {
          type: GET_ORDER_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialOrdersState,
        orderError: true,
      },
      {
        ...initialOrdersState,
        orderRequest: true,
      }
    );
  });

  it('Should handle DELETE_CURRENT_ORDER', () => {
    expect(
      ordersReducer(
        {
          ...initialOrdersState,
          currentOrder: { _id: 'Order' },
        },
        {
          type: DELETE_CURRENT_ORDER,
        }
      )
    ).toEqual(initialOrdersState, {
      ...initialOrdersState,
      currentOrder: { _id: 'Order' },
    });
  });
});
