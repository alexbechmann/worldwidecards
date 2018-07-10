import { ActionType } from 'typesafe-actions';
import * as designerActions from '@app/designer/state/designer.actions';
import * as customerActions from '@app/customer/state/customer.actions';
import * as artistActions from '@app/artist/state/artist.actions';
import * as authActions from '@app/auth/state/auth.actions';

export type AppAction = ActionType<typeof designerActions | typeof artistActions | typeof authActions | typeof customerActions>;
