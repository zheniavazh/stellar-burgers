import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  ADD_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  INCREASE_BUN_COUNT,
  INCREASE_COUNT,
  DECREASE_COUNT,
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_CONSTRUCTOR,
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  DELETE_CURRENT_ORDER,
} from './actions';

const initialIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
  currentIngredient: null,
};

const ingredientsReducer = (state = initialIngredientsState, action) => {
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
    case ADD_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: { ...action.payload },
      };
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
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

const initialConstructorIngredientsState = {
  isConstructor: false,
  ingredients: [],
  bun: null,
  rest: [],
};

const constructorIngredientsReducer = (
  state = initialConstructorIngredientsState,
  action
) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        isConstructor: true,
        ingredients: [
          ...state.ingredients.filter((el) => el.type !== 'bun'),
          action.payload,
        ],
        bun: { ...action.payload },
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        isConstructor: true,
        ingredients: [...state.ingredients, action.payload],
        rest: [...state.rest, action.payload],
      };
    }
    case DELETE_INGREDIENT: {
      const newIngredients = [
        ...state.ingredients.filter((el) => el !== action.payload),
      ];
      return {
        ...state,
        isConstructor: newIngredients.length === 0 ? false : true,
        ingredients: newIngredients,
        rest: newIngredients.filter((el) => el.type !== 'bun'),
      };
    }
    case UPDATE_CONSTRUCTOR: {
      return {
        ...state,
        rest: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const initialOrdersState = {
  orders: [],
  currentOrder: null,
  orderRequest: false,
  orderError: false,
};

const ordersReducer = (state = initialOrdersState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderError: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        currentOrder: { ...action.payload },
        orders: [...state.orders, action.payload],
        orderRequest: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        currentOrder: null,
        orderError: true,
        orderRequest: false,
      };
    }
    case DELETE_CURRENT_ORDER: {
      return {
        ...state,
        currentOrder: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  orders: ordersReducer,
});
