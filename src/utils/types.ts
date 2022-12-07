export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count: number;
  dragId?: number;
};

export type TOrder = {
  _id: string;
  owner: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  status: string;
  name: string;
  ingredients: Array<TIngredient>;
  price: number;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TWSOrders = {
  success: boolean;
  orders: Array<TWSOrder>;
  total: number;
  totalToday: number;
};

export type TWSOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TUser = {
  name: string;
  email: string;
};
