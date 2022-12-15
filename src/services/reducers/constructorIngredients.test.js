import {
  constructorIngredientsReducer,
  initialConstructorIngredientsState,
} from './constructorIngredients';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
} from '../actions/constructorIngredients';

describe('ConstructorIngredients reducer', () => {
  it('Should return the initial state', () => {
    expect(constructorIngredientsReducer(undefined, {})).toEqual(
      initialConstructorIngredientsState
    );
  });

  it('Should handle ADD_BUN', () => {
    expect(
      constructorIngredientsReducer(
        {
          isConstructor: true,
          constructorIngredients: [
            { _id: 'Bun1', type: 'bun' },
            { _id: 'Ingredient', type: 'ingredient' },
          ],
        },
        {
          type: ADD_BUN,
          payload: { _id: 'Bun2', type: 'bun' },
        }
      )
    ).toEqual(
      {
        isConstructor: true,
        constructorIngredients: [
          { _id: 'Bun2', type: 'bun' },
          { _id: 'Ingredient', type: 'ingredient' },
        ],
      },
      {
        isConstructor: true,
        constructorIngredients: [
          { _id: 'Bun1', type: 'bun' },
          { _id: 'Ingredient', type: 'ingredient' },
        ],
      }
    );
  });

  it('Should handle ADD_INGREDIENT', () => {
    expect(
      constructorIngredientsReducer(initialConstructorIngredientsState, {
        type: ADD_INGREDIENT,
        payload: { _id: 'Ingredient' },
      })
    ).toEqual(
      {
        isConstructor: true,
        constructorIngredients: [{ _id: 'Ingredient' }],
      },
      initialConstructorIngredientsState
    );
  });

  it('Should handle DELETE_INGREDIENT', () => {
    expect(
      constructorIngredientsReducer(
        {
          isConstructor: true,
          constructorIngredients: [
            { _id: 'Ingredient1', dragId: 1 },
            { _id: 'Ingredient2', dragId: 2 },
          ],
        },
        {
          type: DELETE_INGREDIENT,
          payload: { _id: 'Ingredient1', dragId: 1 },
        }
      )
    ).toEqual(
      {
        isConstructor: true,
        constructorIngredients: [{ _id: 'Ingredient2', dragId: 2 }],
      },
      {
        isConstructor: true,
        constructorIngredients: [
          { _id: 'Ingredient1', dragId: 1 },
          { _id: 'Ingredient2', dragId: 2 },
        ],
      }
    );
  });

  it('Should handle UPDATE_CONSTRUCTOR', () => {
    expect(
      constructorIngredientsReducer(
        {
          isConstructor: true,
          constructorIngredients: [
            { _id: 'Bun', type: 'bun' },
            { _id: 'Ingredient1' },
            { _id: 'Ingredient2' },
          ],
        },
        {
          type: UPDATE_CONSTRUCTOR,
          payload: [{ _id: 'Ingredient2' }, { _id: 'Ingredient1' }],
        }
      )
    ).toEqual(
      {
        isConstructor: true,
        constructorIngredients: [
          { _id: 'Bun', type: 'bun' },
          { _id: 'Ingredient2' },
          { _id: 'Ingredient1' },
        ],
      },
      {
        isConstructor: true,
        constructorIngredients: [
          { _id: 'Bun', type: 'bun' },
          { _id: 'Ingredient1' },
          { _id: 'Ingredient2' },
        ],
      }
    );
  });

  it('Should handle DELETE_CONSTRUCTOR', () => {
    expect(
      constructorIngredientsReducer(
        { ...initialConstructorIngredientsState, isConstructor: true },
        {
          type: DELETE_CONSTRUCTOR,
        }
      )
    ).toEqual(initialConstructorIngredientsState, {
      ...initialConstructorIngredientsState,
      isConstructor: true,
    });
  });
});
