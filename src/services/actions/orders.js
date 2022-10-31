import { API } from '../../constants';
import { request } from '../../utils/request';

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const DELETE_CURRENT_ORDER = 'DELETE_CURRENT_ORDER';

export function getOrder(payload) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER,
    });
    request(API + 'orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        ingredients: payload,
      }),
    })
      .then((result) => {
        const { order } = result;
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: order,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_ERROR,
        });
        console.log(error.message);
      });
  };
}
