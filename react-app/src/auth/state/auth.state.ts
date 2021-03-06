import { UserInfo } from 'firebase';

export interface AuthState {
  currentUser?: UserInfo;
  initialized: boolean;
}
