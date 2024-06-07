import {combineReducers} from 'redux';
import getUserSlice from './getUserSlice';
import updateUserSlice from './updateUserSlice';
import addUserSlice from './addUserSlice';
import uploadImgSlice from './uploadImgSlice';

const userReducer = combineReducers({
  addUser: addUserSlice,
  getUser: getUserSlice,
  updateUser: updateUserSlice,
  uploadImg: uploadImgSlice,
});

export default userReducer;
