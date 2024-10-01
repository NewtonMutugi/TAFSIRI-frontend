import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk'; // Ensure correct import
import rootReducer from './utils/reducers'; // Ensure correct path

// Configuration for redux-persist
const persistConfig = {
  key: 'dwh',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Setup Redux DevTools extension if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store with middleware
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Create the persistor
export const persistor = persistStore(store);
