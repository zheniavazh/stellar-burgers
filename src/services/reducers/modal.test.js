import { modalReducer, initialModalState } from './modal';
import {
  SHOW_INGREDIENT_MODAL,
  SHOW_ORDER_MODAL,
  SHOW_FEED_ORDER_MODAL,
  HIDE_INGREDIENT_MODAL,
  HIDE_ORDER_MODAL,
  HIDE_FEED_ORDER_MODAL,
} from '../actions/modal';

describe('Modal reducer', () => {
  it('Should return the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(initialModalState);
  });

  it('Should handle SHOW_INGREDIENT_MODAL', () => {
    expect(
      modalReducer(initialModalState, {
        type: SHOW_INGREDIENT_MODAL,
      })
    ).toEqual(
      { ...initialModalState, isIngredientModal: true },
      initialModalState
    );
  });

  it('Should handle SHOW_ORDER_MODAL', () => {
    expect(
      modalReducer(initialModalState, {
        type: SHOW_ORDER_MODAL,
      })
    ).toEqual(
      {
        ...initialModalState,
        isOrderModal: true,
      },
      initialModalState
    );
  });

  it('Should handle SHOW_FEED_ORDER_MODAL', () => {
    expect(
      modalReducer(initialModalState, {
        type: SHOW_FEED_ORDER_MODAL,
      })
    ).toEqual(
      {
        ...initialModalState,
        isFeedOrderModal: true,
      },
      initialModalState
    );
  });

  it('Should handle HIDE_INGREDIENT_MODAL', () => {
    expect(
      modalReducer(
        { ...initialModalState, isIngredientModal: true },
        {
          type: HIDE_INGREDIENT_MODAL,
        }
      )
    ).toEqual(initialModalState, {
      ...initialModalState,
      isIngredientModal: true,
    });
  });

  it('Should handle HIDE_ORDER_MODAL', () => {
    expect(
      modalReducer(
        {
          ...initialModalState,
          isOrderModal: true,
        },
        {
          type: HIDE_ORDER_MODAL,
        }
      )
    ).toEqual(initialModalState, {
      ...initialModalState,
      isOrderModal: true,
    });
  });

  it('Should handle HIDE_FEED_ORDER_MODAL', () => {
    expect(
      modalReducer(
        {
          ...initialModalState,
          isFeedOrderModal: true,
        },
        {
          type: HIDE_FEED_ORDER_MODAL,
        }
      )
    ).toEqual(initialModalState, {
      ...initialModalState,
      isFeedOrderModal: true,
    });
  });
});
