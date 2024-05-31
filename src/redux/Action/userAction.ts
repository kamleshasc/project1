import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, put} from '../../service/Apis';
import {errorMsg} from '../../config/helper';

export const fetchGetUser = createAsyncThunk(
  'getUser',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/users/getuser'});
      return res;
    } catch (error) {
      let errorMessage = errorMsg(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface UpdateUserParams {
  userId: string;
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    role: string;
    mobileNumber?: string | object;
    dateOfJoining?: string;
    status?: string;
  };
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
      let errorMessage = errorMsg(error);
      return rejectWithValue(errorMessage);
    }
  },
);
