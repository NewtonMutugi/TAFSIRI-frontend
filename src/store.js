import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import rootReducer from './utils/reducers';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = { key: 'dwh', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);
const API_URL = process.env.REACT_APP_BACKEND_URL;

export const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);

const deleteAccessConfig = async (id) => {
  console.log(id);
  const res = await fetch(`${API_URL}/db_access/delete_connection/${id.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const useDeleteAccessConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccessConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['access_configs'] });
    },
  });
};

const getAllAccessConfigs = async () => {
  const res = await fetch(`${API_URL}/db_access/available_connections`);
  const jsonData = await res.json();
  return jsonData?.credentials ?? [];
};

export const useGetAccessConfigs = () =>
  useQuery({
    queryKey: ['access_configs'],
    queryFn: getAllAccessConfigs,
  });
