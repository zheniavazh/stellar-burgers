export const SHOW_INGREDIENT_MODAL: 'SHOW_INGREDIENT_MODAL' =
  'SHOW_INGREDIENT_MODAL';
export const SHOW_ORDER_MODAL: 'SHOW_ORDER_MODAL' = 'SHOW_ORDER_MODAL';
export const SHOW_FEED_ORDER_MODAL: 'SHOW_FEED_ORDER_MODAL' =
  'SHOW_FEED_ORDER_MODAL';
export const HIDE_INGREDIENT_MODAL: 'HIDE_INGREDIENT_MODAL' =
  'HIDE_INGREDIENT_MODAL';
export const HIDE_ORDER_MODAL: 'HIDE_ORDER_MODAL' = 'HIDE_ORDER_MODAL';
export const HIDE_FEED_ORDER_MODAL: 'HIDE_FEED_ORDER_MODAL' =
  'HIDE_FEED_ORDER_MODAL';

type TShowIngredientModalAction = {
  readonly type: typeof SHOW_INGREDIENT_MODAL;
};

type TShowOrderModalAction = {
  readonly type: typeof SHOW_ORDER_MODAL;
};

type TShowFeedOrderModalAction = {
  readonly type: typeof SHOW_FEED_ORDER_MODAL;
};

type THideIngredientModalAction = {
  readonly type: typeof HIDE_INGREDIENT_MODAL;
};

type THideOrderModalAction = {
  readonly type: typeof HIDE_ORDER_MODAL;
};

type THideFeedOrderModalAction = {
  readonly type: typeof HIDE_FEED_ORDER_MODAL;
};

export type TModalActions =
  | TShowIngredientModalAction
  | TShowOrderModalAction
  | TShowFeedOrderModalAction
  | THideIngredientModalAction
  | THideOrderModalAction
  | THideFeedOrderModalAction;
