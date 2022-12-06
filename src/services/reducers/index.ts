import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './constructorIngredients';
import { ingredientsReducer } from './ingredients';
import { ordersReducer } from './orders';
import { modalReducer } from './modal';
import { authReducer } from './auth';
import { wsFeedReducer } from './wsFeedReducer';
import { wsOrdersReducer } from './wsOrdersReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  orders: ordersReducer,
  modal: modalReducer,
  auth: authReducer,
  wsFeed: wsFeedReducer,
  wsOrders: wsOrdersReducer,
});
