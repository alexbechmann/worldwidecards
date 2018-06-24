import * as designerActions from '@app/designer/state/designer.actions';
import { ActionType } from 'typesafe-actions';
export { designerActions };

export type Action = ActionType<typeof designerActions>;
