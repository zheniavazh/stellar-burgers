import { BUN } from '../constants';
import { TIngredient } from './types';

export const sortIngredientsWithCount = (
  ingredients: Array<TIngredient>,
  ids: Array<string>
) => {
  const sortedIngredients: Array<TIngredient> = [];
  const newIngredients = ids.map(
    (id) => ingredients.filter((el) => el._id === id)[0]
  );
  newIngredients.forEach((ingredient) => {
    if (
      ingredient.type === BUN &&
      sortedIngredients.find((el) => el._id === ingredient._id) === undefined
    ) {
      sortedIngredients.unshift({ ...ingredient, count: 2 });
    }
    if (ingredient.type !== BUN) {
      if (
        sortedIngredients.find((el) => el._id === ingredient._id) === undefined
      ) {
        sortedIngredients.push({ ...ingredient, count: 1 });
      } else {
        const index = sortedIngredients.findIndex(
          (el) => el._id === ingredient._id
        );
        sortedIngredients[index].count++;
      }
    }
  });
  return sortedIngredients;
};

export const sortIngredientsWithoutCount = (
  ingredients: Array<TIngredient>,
  ids: Array<string>
) => {
  const sortedIngredients: Array<TIngredient> = [];
  const newIngredients = ids.map(
    (id) => ingredients.filter((el) => el._id === id)[0]
  );
  newIngredients.forEach((ingredient) => {
    if (
      ingredient.type === BUN &&
      sortedIngredients.find((el) => el._id === ingredient._id) === undefined
    ) {
      sortedIngredients.unshift({ ...ingredient });
    }
    if (ingredient.type !== BUN) {
      sortedIngredients.push({ ...ingredient });
    }
  });
  return sortedIngredients;
};
