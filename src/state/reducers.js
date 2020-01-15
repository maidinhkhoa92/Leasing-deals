import { combineReducers } from 'redux';
import { Reducers as dealsReducers } from './deals/reducers';

const reducers = combineReducers({
  deals: dealsReducers, 
});
export default reducers;
