import { API } from '../constants';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    fetch(API + 'ingredients')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        });
        throw new Error(`Ошибка ${response.status}`);
      })
      .then((result) => {
        const { data } = result;
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        });
        console.log(error.message);
      });
  };
}

export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';
export const INCREASE_BUN_COUNT = 'INCREASE_BUN_COUNT';
export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_CONSTRUCTOR = 'UPDATE_CONSTRUCTOR';

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
        dispatch({
          type: GET_ORDER_ERROR,
        });
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
