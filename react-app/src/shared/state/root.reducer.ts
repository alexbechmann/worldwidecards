import { combineReducers, Reducer } from 'redux';
import { AppState } from './app.state';
import { designerReducer } from '@app/designer';
import { authReducer } from '@app/auth';

export const rootReducer: Reducer<AppState> = combineReducers({
  designer: designerReducer,
  auth: authReducer
});
