import { DesignerState } from '@app/designer/state/designer.state';
import { AuthState } from '@app/auth/state/auth.state';
import { ArtistState } from '@app/artist/state/artist.state';
import { CustomerState } from '@app/customer/state/customer.state';

export interface AppState {
  designer: DesignerState;
  auth: AuthState;
  artist: ArtistState;
  customer: CustomerState;
}
