import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_CONSTRUCTOR,
} from '../actions/constructorIngredients';

const initialConstructorIngredientsState = {
  isConstructor: false,
  ingredients: [],
};

export const constructorIngredientsReducer = (
  state = initialConstructorIngredientsState,
  action
) => {
  switch (action.type) {
    case ADD_BUN: {
      const newIngredients = [
        ...state.ingredients.filter((el) => el.type !== 'bun'),
      ];
      return {
        ...state,
        isConstructor: true,
        ingredients: [action.payload, ...newIngredients],
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        isConstructor: true,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case DELETE_INGREDIENT: {
      const newIngredients = [
        ...state.ingredients.filter((el) => el !== action.payload),
      ];
      return {
        ...state,
        isConstructor: newIngredients.length !== 0,
        ingredients: newIngredients,
      };
    }
    case UPDATE_CONSTRUCTOR: {
      const bun = state.ingredients.find((el) => el.type === 'bun');
      return {
        ...state,
        ingredients: [bun, ...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
