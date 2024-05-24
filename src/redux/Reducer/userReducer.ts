import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchGetUser} from '../Action/userAction';

export interface UserState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: UserState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getUserSlice = createSlice({
  name: 'getUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGetUser.pending, state => {
        state.isLoader = true;
        state.data = [];
      })
      .addCase(
        fetchGetUser.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchGetUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default getUserSlice.reducer;
