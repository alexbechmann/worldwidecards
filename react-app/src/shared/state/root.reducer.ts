import { combineReducers, Reducer } from 'redux';
import { AppState } from './app.state';
import { authReducer } from '@app/auth';
import { artistDesignerReducer } from '@app/designer';

export const rootReducer: Reducer<AppState> = combineReducers({
  artistDesigner: artistDesignerReducer,
  auth: authReducer
});
