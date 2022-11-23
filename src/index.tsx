import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import {
  Provider,
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const composeEnhancers = composeWithDevTools({});
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
