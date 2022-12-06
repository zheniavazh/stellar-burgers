import { TIngredient } from '../../utils/types';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const UPDATE_CONSTRUCTOR: 'UPDATE_CONSTRUCTOR' = 'UPDATE_CONSTRUCTOR';
export const DELETE_CONSTRUCTOR: 'DELETE_CONSTRUCTOR' = 'DELETE_CONSTRUCTOR';

type TAddBunAction = {
  readonly type: typeof ADD_BUN;
  readonly payload: TIngredient;
};

type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredient;
};

type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: TIngredient;
};

type TUpdateConstructorAction = {
  readonly type: typeof UPDATE_CONSTRUCTOR;
  readonly payload: Array<TIngredient>;
};

type TDeleteConstructorAction = {
  readonly type: typeof DELETE_CONSTRUCTOR;
};

export type TConstructorIngredientsActions =
  | TAddBunAction
  | TAddIngredientAction
  | TDeleteIngredientAction
  | TUpdateConstructorAction
  | TDeleteConstructorAction;
