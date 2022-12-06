import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore, Action, ActionCreator } from 'redux';
import {
  Provider,
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { rootReducer } from './services/reducers/index';
import { TAuthActions } from './services/actions/auth';
import { TConstructorIngredientsActions } from './services/actions/constructorIngredients';
import { TIngredientsActions } from './services/actions/ingredients';
import { TModalActions } from './services/actions/modal';
import { TOrdersActions } from './services/actions/orders';
import { socketMiddleware } from './middleware/socketMiddleware';
import {
  TWSFeedActions,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_ORDERS,
} from './services/actions/wsFeedActions';
import {
  TWSOrdersActions,
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_ORDERS,
} from './services/actions/wsOrdersActions';
import { WSURL } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onError: WS_FEED_CONNECTION_ERROR,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onMessage: WS_FEED_GET_ORDERS,
};

const wsOrdersActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onMessage: WS_ORDERS_GET_ORDERS,
};

const composeEnhancers = composeWithDevTools({});
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(WSURL, wsFeedActions),
    socketMiddleware(WSURL, wsOrdersActions)
  )
);

const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type TAppActions =
  | TAuthActions
  | TConstructorIngredientsActions
  | TIngredientsActions
  | TModalActions
  | TOrdersActions
  | TWSFeedActions
  | TWSOrdersActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAppActions>
>;

export const useAppDispatch: () => AppDispatch | AppThunk = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
