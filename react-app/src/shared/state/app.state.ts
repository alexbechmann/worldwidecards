import { DesignerState } from '@app/designer';
import { AuthState } from '@app/auth';
import { ArtistState } from '@app/artist';

export interface AppState {
  designer: DesignerState;
  auth: AuthState;
  artist: ArtistState;
}
