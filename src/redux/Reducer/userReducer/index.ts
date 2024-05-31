import {combineReducers} from 'redux';
import getUserSlice from './getUserSlice';
import updateUserSlice from './updateUserSlice';

const userReducer = combineReducers({
  getUser: getUserSlice,
  updateUser: updateUserSlice,
});

export default userReducer;
