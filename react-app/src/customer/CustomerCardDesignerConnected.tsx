import { connect } from 'react-redux';
import {
  CardDesignerConnected,
  CardDesignerConnectedDispatchProps,
  CardDesignerConnectedProps
} from '@app/designer/CardDesignerConnected';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppState } from '@app/state';
import { saveCardDesign } from './state/customer.actions';

const mapDispatchToProps: CardDesignerConnectedDispatchProps = { saveCardDesign };

function mapStateToProps(state: AppState): CardDesignerConnectedProps {
  return {
    mode: DesignerMode.Customer,
    deleting: false
  };
}

export const CustomerCardDesignerConnected = connect(mapStateToProps, mapDispatchToProps)(CardDesignerConnected);
