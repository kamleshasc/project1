import {combineReducers} from '@reduxjs/toolkit';
import getServiceSlice from './getServiceSlice';
import addServiceSlice from './addServiceSlice';
import updateServiceSlice from './updateServiceSlice';

const serviceReducer = combineReducers({
  getService: getServiceSlice,
  addService: addServiceSlice,
  updateService: updateServiceSlice,
});

export default serviceReducer;
