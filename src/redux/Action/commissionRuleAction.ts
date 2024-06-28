import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMsgWrap} from '../../config/helper';
import {get, post, put} from '../../service/Apis';

export const fetchCommissionRules = createAsyncThunk(
  'getCommissionRules',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/commissionrules/getRules'});
      return res;
    } catch (error) {
      const errorMesssage = errorMsgWrap(error);
      return rejectWithValue(errorMesssage);
    }
  },
);

interface CommissionRulePayload {
  name: string;
  criteria: string;
  value: number;
  applicableUser: string[];
  createdB?: string;
  updatedB?: string;
}

export const fetchAddCommissionRules = createAsyncThunk(
  'AddCommissionRule',
  async (payload: CommissionRulePayload, {rejectWithValue}) => {
    try {
      let res = await post({url: '/commissionrules/addRule', body: payload});
      return res;
    } catch (error) {
      console.log(error,'adddd commmmmm');
      
      const errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface UpdateCommissionRulePayload {
  commissionId: string;
  payload: CommissionRulePayload;
}

export const fetchUpdateCommissionRules = createAsyncThunk(
  'UpdateCommissionRule',
  async (
    {commissionId, payload}: UpdateCommissionRulePayload,
    {rejectWithValue},
  ) => {
    try {
      const res = await put({
        url: `/commissionrules/${commissionId}`,
        body: payload,
      });
      return res;
    } catch (error) {
      console.log(error, 'errrr');

      const errorMessage = errorMsgWrap(error);
      console.log(errorMessage,',,,,,');
      
      throw rejectWithValue(errorMessage);
    }
  },
);
