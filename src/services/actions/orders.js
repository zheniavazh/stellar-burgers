import { API } from '../../constants';

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const DELETE_CURRENT_ORDER = 'DELETE_CURRENT_ORDER';

export function getOrder(payload) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER,
    });
    fetch(API + 'orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: payload,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Ошибка ${response.status}`);
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
