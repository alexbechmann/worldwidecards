import { DesignerState } from 'src/cards';
import { AuthState } from 'src/auth';

export interface AppState {
  designer: DesignerState;
  auth: AuthState;
}
