import { ingredientsReducer, initialIngredientsState } from './ingredients';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  INCREASE_BUN_COUNT,
  INCREASE_COUNT,
  DECREASE_COUNT,
  DELETE_COUNT,
} from '../actions/ingredients';

describe('Ingredients reducer', () => {
  it('Should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialIngredientsState);
  });

  it('Should handle GET_INGREDIENTS', () => {
    expect(
      ingredientsReducer(initialIngredientsState, {
        type: GET_INGREDIENTS,
      })
    ).toEqual(
      {
        ...initialIngredientsState,
        ingredientsRequest: true,
      },
      initialIngredientsState
    );
  });

  it('Should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredientsReducer(
        {
          ...initialIngredientsState,
          ingredientsRequest: true,
        },
        {
          type: GET_INGREDIENTS_SUCCESS,
          payload: [{ _id: 'Ingredient', count: 0 }],
        }
      )
    ).toEqual(
      {
        ...initialIngredientsState,
        ingredients: [{ _id: 'Ingredient', count: 0 }],
      },
      {
        ...initialIngredientsState,
        ingredientsRequest: true,
      }
    );
  });

  it('Should handle GET_INGREDIENTS_ERROR', () => {
    expect(
      ingredientsReducer(
        {
          ...initialIngredientsState,
          ingredientsRequest: true,
        },
        {
          type: GET_INGREDIENTS_ERROR,
        }
      )
    ).toEqual(
      {
        ...initialIngredientsState,
        ingredientsError: true,
      },
      {
        ...initialIngredientsState,
        ingredientsRequest: true,
      }
    );
  });

  it('Should handle INCREASE_BUN_COUNT', () => {
    expect(
      ingredientsReducer(
        {
          ...initialIngredientsState,
          ingredients: [
            { _id: 'Bun1', type: 'bun', count: 1 },
            { _id: 'Bun2', type: 'bun', count: 0 },
          ],
        },
        {
          type: INCREASE_BUN_COUNT,
          payload: { _id: 'Bun2', type: 'bun', count: 0 },
        }
      )
    ).toEqual(
      {
        ...initialIngredientsState,
        ingredients: [
          { _id: 'Bun1', type: 'bun', count: 0 },
          { _id: 'Bun2', type: 'bun', count: 1 },
        ],
      },
      {
        ...initialIngredientsState,
        ingredients: [
          { _id: 'Bun1', type: 'bun', count: 1 },
          { _id: 'Bun2', type: 'bun', count: 0 },
        ],
      }
    );
  });

  it('Should handle INCREASE_COUNT', () => {
    expect(
      ingredientsReducer(
        {
          ...initialIngredientsState,
          ingredients: [{ _id: 'Ingredient', count: 1 }],
        },
        {
          type: INCREASE_COUNT,
          payload: { _id: 'Ingredient', count: 1 },
        }
      )
    ).toEqual(
      {
        ...initialIngredientsState,
        ingredients: [{ _id: 'Ingredient', count: 2 }],
      },
      {
        ...initialIngredientsState,
        ingredients: [{ _id: 'Ingredient', count: 1 }],
      }
    );
  });

  it('Should handle DECREASE_COUNT', () => {
    expect(
      ingredientsReducer(
        {
          ...initialIngredientsState,
          ingredients: [{ _id: 'Ingredient', count: 2 }],
        },
        {
          type: DECREASE_COUNT,
          payload: { _id: 'Ingredient', count: 2 },
        }
      )
    ).toEqual(
      {
        ...initialIngredientsState,
        ingredients: [{ _id: 'Ingredient', count: 1 }],
      },
      {
        ...initialIngredientsState,
        ingredients: [{ _id: 'Ingredient', count: 2 }],
      }
    );
  });

  it('Should handle DELETE_COUNT', () => {
    expect(
      ingredientsReducer(
        {
          ...initialIngredientsState,
          ingredients: [{ _id: 'Ingredient', count: 1 }],
        },
        {
          type: DELETE_COUNT,
        }
      )
    ).toEqual(
      {
        ...initialIngredientsState,
        ingredients: [{ _id: 'Ingredient', count: 0 }],
      },
      {
        ...initialIngredientsState,
        ingredients: [{ _id: 'Ingredient', count: 1 }],
      }
    );
  });
});
