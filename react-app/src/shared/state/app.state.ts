import { DesignerState } from '@app/designer';
import { AuthState } from '@app/auth';
import { ArtistState } from '@app/artist';
import { CustomerState } from '@app/customer';

export interface AppState {
  designer: DesignerState;
  auth: AuthState;
  artist: ArtistState;
  customer: CustomerState;
}
