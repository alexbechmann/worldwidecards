import { combineReducers, Reducer } from 'redux';
import { AppState } from './app.state';
import { cardReducer } from 'src/cards';

export const rootReducer: Reducer<AppState> = combineReducers({
  card: cardReducer
});
