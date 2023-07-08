// rootReducer.js
import { combineReducers } from 'redux';
import formReducer from './reducers';

const rootReducer = combineReducers({
  form: formReducer,
});

export default rootReducer;