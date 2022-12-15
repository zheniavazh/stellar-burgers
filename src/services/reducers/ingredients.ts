import { TIngredientsActions } from '../actions/ingredients';
import { TIngredient } from '../../utils/types';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_BUN_COUNT,
  INCREASE_COUNT,
  DECREASE_COUNT,
  DELETE_COUNT,
} from '../actions/ingredients';

type TInitialIngredientsState = {
  ingredients: Array<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsError: boolean;
};

export const initialIngredientsState: TInitialIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
};

export const ingredientsReducer = (
  state = initialIngredientsState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsError: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload.map((el) => ({ ...el, count: 0 })),
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredients: [],
        ingredientsError: true,
        ingredientsRequest: false,
      };
    }
    case INCREASE_BUN_COUNT: {
      const buns = state.ingredients
        .filter((el) => el.type === 'bun')
        .map((el) =>
          el._id === action.payload._id
            ? { ...el, count: 1 }
            : { ...el, count: 0 }
        );
      return {
        ...state,
        ingredients: [
          ...state.ingredients.filter((el) => el.type !== 'bun'),
          ...buns,
        ],
      };
    }
    case INCREASE_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((el) =>
          el._id === action.payload._id ? { ...el, count: el.count + 1 } : el
        ),
      };
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((el) =>
          el._id === action.payload._id ? { ...el, count: el.count - 1 } : el
        ),
      };
    }
    case DELETE_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((el) => ({ ...el, count: 0 })),
      };
    }
    default: {
      return state;
    }
  }
};
