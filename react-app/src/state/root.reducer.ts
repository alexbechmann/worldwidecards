import { combineReducers, Reducer } from 'redux';
import { AppState } from './app.state';
import { designerReducer } from '@app/designer/state/designer.reducer';
import { authReducer } from '@app/auth/state/auth.reducer';
import { artistReducer } from '@app/artist/state/artist.reducer';
import { customerReducer } from '@app/customer/state/customer.reducer';

export const rootReducer: Reducer<AppState> = combineReducers({
  designer: designerReducer,
  artist: artistReducer,
  auth: authReducer,
  customer: customerReducer
});
