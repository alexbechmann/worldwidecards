import { DesignerState } from '@app/designer';
import { AuthState } from '@app/auth';

export interface AppState {
  designer: DesignerState;
  auth: AuthState;
}
