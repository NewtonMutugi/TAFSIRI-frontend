import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import rootReducer from './utils/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = { key: 'dwh', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
