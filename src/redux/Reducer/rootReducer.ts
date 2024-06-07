import {combineReducers} from 'redux';
import userReducer from './userReducer';
import serviceReducer from './serviceReducer';

const rootReducer = combineReducers({
  user: userReducer,
  service: serviceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
