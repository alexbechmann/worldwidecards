import { CardState } from 'src/cards';
import { AuthState } from 'src/auth';

export interface AppState {
  card: CardState;
  auth: AuthState;
}
