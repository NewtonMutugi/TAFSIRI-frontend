import { combineReducers } from 'redux';

import authReducer from './authReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  auth: authReducer,
  menu: menuReducer,
});
