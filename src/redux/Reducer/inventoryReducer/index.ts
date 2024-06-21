import {combineReducers} from '@reduxjs/toolkit';
import getInventorySlice from './getInventorySlice';
import addInventorySlice from './addInventorySlice';

const inventoryReducer = combineReducers({
  getInventory: getInventorySlice,
  addInventory: addInventorySlice,
});

export default inventoryReducer;
