import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_BUN_COUNT,
  INCREASE_COUNT,
  DECREASE_COUNT,
} from '../actions/ingredients';

const initialIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
};

export const ingredientsReducer = (state = initialIngredientsState, action) => {
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
    default: {
      return state;
    }
  }
};
