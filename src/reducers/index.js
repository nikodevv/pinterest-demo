import { persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {auth} from './auth';
import {modals} from "./modals";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'


const persistConfig = {
  key: 'rootState',
  storage: storage,
  stateReconciler: hardSet,
};
export default persistCombineReducers( persistConfig ,{
  auth,
  modals
})
