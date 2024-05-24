import {createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../service/Apis';
import axios from 'axios';

export const fetchGetUser = createAsyncThunk(
  'getUser',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/users'});
      return res;
    } catch (error) {
      let errorMessage = 'Unknown error occurred';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage =
          error.response.data.message ||
          'Error occurred while fetching user data';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);
