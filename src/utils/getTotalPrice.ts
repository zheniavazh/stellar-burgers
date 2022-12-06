import { TIngredient } from './types';
import { BUN } from '../constants';

export const getTotalPrice = (ingredients: Array<TIngredient>) => {
  return ingredients
    .map((el) => (el.type === BUN ? el.price * 2 : el.price))
    .reduce((acc, price) => acc + price, 0);
};
