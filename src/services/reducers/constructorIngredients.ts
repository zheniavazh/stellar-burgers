import { TConstructorIngredientsActions } from '../actions/constructorIngredients';
import { TIngredient } from '../../utils/types';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
} from '../actions/constructorIngredients';

type TInitialConstructorIngredientsState = {
  isConstructor: boolean;
  constructorIngredients: Array<TIngredient>;
};

export const initialConstructorIngredientsState: TInitialConstructorIngredientsState =
  {
    isConstructor: false,
    constructorIngredients: [],
  };

export const constructorIngredientsReducer = (
  state = initialConstructorIngredientsState,
  action: TConstructorIngredientsActions
) => {
  switch (action.type) {
    case ADD_BUN: {
      const newIngredients = [
        ...state.constructorIngredients.filter((el) => el.type !== 'bun'),
      ];
      return {
        ...state,
        isConstructor: true,
        constructorIngredients: [action.payload, ...newIngredients],
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        isConstructor: true,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.payload,
        ],
      };
    }
    case DELETE_INGREDIENT: {
      const newIngredients = [
        ...state.constructorIngredients.filter(
          (el) => el.dragId !== action.payload.dragId
        ),
      ];
      console.log(newIngredients);
      return {
        ...state,
        isConstructor: newIngredients.length !== 0,
        constructorIngredients: newIngredients,
      };
    }
    case UPDATE_CONSTRUCTOR: {
      const bun = [
        ...state.constructorIngredients.filter((el) => el.type === 'bun'),
      ];
      return {
        ...state,
        constructorIngredients: [...bun, ...action.payload],
      };
    }
    case DELETE_CONSTRUCTOR: {
      return {
        ...state,
        isConstructor: false,
        constructorIngredients: [],
      };
    }
    default: {
      return state;
    }
  }
};
