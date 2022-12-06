import { API } from '../../constants';
import { request } from '../../utils/request';
import { AppDispatch } from './../../index';
import { TIngredient } from './../../utils/types';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
  'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' =
  'GET_INGREDIENTS_ERROR';

export function getIngredients() {
  return function (dispatch: AppDispatch) {
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

export const INCREASE_BUN_COUNT: 'INCREASE_BUN_COUNT' = 'INCREASE_BUN_COUNT';
export const INCREASE_COUNT: 'INCREASE_COUNT' = 'INCREASE_COUNT';
export const DECREASE_COUNT: 'DECREASE_COUNT' = 'DECREASE_COUNT';
export const DELETE_COUNT: 'DELETE_COUNT' = 'DELETE_COUNT';

type TGetIngredientsAction = {
  readonly type: typeof GET_INGREDIENTS;
};

type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredient>;
};

type TGetIngredientsErrorAction = {
  readonly type: typeof GET_INGREDIENTS_ERROR;
};

type TIncreaseBunCountAction = {
  readonly type: typeof INCREASE_BUN_COUNT;
  readonly payload: TIngredient;
};

type TIncreaseCountAction = {
  readonly type: typeof INCREASE_COUNT;
  readonly payload: TIngredient;
};

type TDecreaseCountAction = {
  readonly type: typeof DECREASE_COUNT;
  readonly payload: TIngredient;
};

type TDeleteCountAction = {
  readonly type: typeof DELETE_COUNT;
};

export type TIngredientsActions =
  | TGetIngredientsAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsErrorAction
  | TIncreaseBunCountAction
  | TIncreaseCountAction
  | TDecreaseCountAction
  | TDeleteCountAction;
