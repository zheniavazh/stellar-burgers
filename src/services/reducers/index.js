import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './constructorIngredients';
import { ingredientsReducer } from './ingredients';
import { ordersReducer } from './orders';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  orders: ordersReducer,
});
