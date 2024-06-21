import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMsgWrap} from '../../config/helper';
import {get, post, put} from '../../service/Apis';

export const fetchInventory = createAsyncThunk(
  'getInventory',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/inventory/getAllInventory'});
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface InventoryBody {
  name: string;
  quantity: string;
  unit: string;
  brand: string;
  price: string;
  stock: number;
  createdBy?: string;
  updatedBy?: string;
}

export const fetchAddInventory = createAsyncThunk(
  'addInventory',
  async (payload: InventoryBody, {rejectWithValue}) => {
    try {
      const res = await post({url: '/inventory/newInventory', body: payload});
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface updateInventoryPayload {
  inventoryId: string;
  payload: InventoryBody;
}

export const fetchUpdateInventory = createAsyncThunk(
  'updateInventory',
  async ({inventoryId, payload}: updateInventoryPayload, {rejectWithValue}) => {
    try {
      const res = await put({url: `/inventory/${inventoryId}`, body: payload});
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
