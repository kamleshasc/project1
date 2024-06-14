import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, post, put} from '../../service/Apis';
import {errorMsgWrap} from '../../config/helper';

export const fetchService = createAsyncThunk(
  'getService',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/services/getAllservices'});
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface serviceDetails {
  serviceName: string;
  duration: string;
  category: string;
  price: number;
  onsiteOffsite: string;
  selectedBranches: string[];
  selectedUsers: string[];
  status: string;
}

export const fetchAddService = createAsyncThunk(
  'addService',
  async (payload: serviceDetails, {rejectWithValue}) => {
    try {
      const res = await post({
        url: '/services/newservice',
        body: payload,
      });
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
interface updateServiceBody {
  serviceId: string | number;
  payload: serviceDetails;
}

export const fetchUpdateService = createAsyncThunk(
  'updateService',
  async ({serviceId, payload}: updateServiceBody, {rejectWithValue}) => {
    try {
      const res = await put({
        url: `/services/${serviceId}`,
        body: payload,
      });
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const uploadServiceImg = createAsyncThunk(
  'uploadImg',
  async (payload: FormData, {rejectWithValue}) => {
    try {
      const res = await post({
        url: '/services/serviceImg',
        body: payload,
        hasFormData: true,
      });
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
