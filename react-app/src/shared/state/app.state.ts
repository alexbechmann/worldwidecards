import { CardState } from 'src/cards';
import { AuthState } from 'src/auth';

export interface AppState {
  readonly card: CardState;
  readonly auth: AuthState;
}
