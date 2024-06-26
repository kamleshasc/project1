import {combineReducers} from 'redux';
import userReducer from './userReducer';
import serviceReducer from './serviceReducer';
import clientReducer from './clientReducer';
import inventoryReducer from './inventoryReducer';
import commissionRuleReducer from './commissionRuleReducer';

const rootReducer = combineReducers({
  user: userReducer,
  service: serviceReducer,
  client: clientReducer,
  inventory: inventoryReducer,
  commissionRule: commissionRuleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
