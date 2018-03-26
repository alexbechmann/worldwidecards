import { combineReducers, Reducer } from 'redux';
import { AppState } from './app.state';
import { cardReducer } from 'src/cards';
import { authReducer } from 'src/auth';

export const rootReducer: Reducer<AppState> = combineReducers({
  card: cardReducer,
  auth: authReducer
});
