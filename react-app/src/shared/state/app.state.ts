import { DesignerState } from '@app/cards';
import { AuthState } from '@app/auth';

export interface AppState {
  designer: DesignerState;
  auth: AuthState;
}
