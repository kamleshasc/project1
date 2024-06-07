import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, post, put} from '../../service/Apis';
import {errorMsgWrap} from '../../config/helper';

export const fetchGetUser = createAsyncThunk(
  'getUser',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/users/getuser'});
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface userDetails {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  role: string;
  mobileNumber: object;
  dateOfjoining: string;
  status: string;
  userImage: string;
}

interface UpdateUserParams {
  userId: string;
  payload: userDetails;
}

export const fetchUpdateUser = createAsyncThunk(
  'updateUser',
  async ({userId, payload}: UpdateUserParams, {rejectWithValue}) => {
    try {
      const res = await put({
        url: `/users/${userId}`,
        body: payload,
      });
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchAddUser = createAsyncThunk(
  'addUser',
  async (payload: userDetails, {rejectWithValue}) => {
    try {
      const res = await post({
        url: '/users/newuser',
        body: payload,
      });
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const uploadImg = createAsyncThunk(
  'uploadImg',
  async (payload: FormData, {rejectWithValue}) => {
    try {
      const res = await post({
        url: '/users/uploadImg',
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
