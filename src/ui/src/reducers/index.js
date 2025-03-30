import { combineReducers } from 'redux';
import backReducer from './bank-reducer';

const rootReducer = combineReducers({
  "customer-data": backReducer
});

export default rootReducer;
