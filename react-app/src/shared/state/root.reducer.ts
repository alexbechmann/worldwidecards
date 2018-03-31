import { combineReducers, Reducer } from 'redux';
import { AppState } from './app.state';
import { designerReducer } from 'src/cards';
import { authReducer } from 'src/auth';

export const rootReducer: Reducer<AppState> = combineReducers({
  designer: designerReducer,
  auth: authReducer
});
