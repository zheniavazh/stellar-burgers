import { API } from '../../constants';
import { request } from '../../utils/request';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    request(API + 'ingredients')
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

export const INCREASE_BUN_COUNT = 'INCREASE_BUN_COUNT';
export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
export const DELETE_COUNT = 'DELETE_COUNT';
