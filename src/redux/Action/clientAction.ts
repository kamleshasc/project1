import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, post, put} from '../../service/Apis';
import {errorMsgWrap} from '../../config/helper';

export const fetchClient = createAsyncThunk(
  'getClient',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/clients/getClients'});
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface clientDetais {
  firstName: string;
  lastName: string;
  mobileNumber: object;
  email: string;
  addressLineOne: string;
  addressLineTwo: string;
  country: string;
  state: string;
  city: string;
  prefix: string;
  owner: string;
}

export const fetchAddClient = createAsyncThunk(
  'addClient',
  async (payload: clientDetais, {rejectWithValue}) => {
    try {
      const res = await post({
        url: '/clients/addClient',
        body: payload,
      });
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface updateClientBody {
  clientId: string;
  payload: clientDetais;
}

export const fetchUpdateClient = createAsyncThunk(
  'updateClient',
  async ({clientId, payload}: updateClientBody, {rejectWithValue}) => {
    try {
      const res = await put({
        url: `/clients/${clientId}`,
        body: payload,
      });
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
