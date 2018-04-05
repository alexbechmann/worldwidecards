import { ArtistDesignerState } from '@app/designer';
import { AuthState } from '@app/auth';

export interface AppState {
  artistDesigner: ArtistDesignerState;
  auth: AuthState;
}
