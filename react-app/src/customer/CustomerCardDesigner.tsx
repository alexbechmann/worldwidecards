import { connect } from 'react-redux';
import CardDesigner, { CardDesignerExtendedProps } from '@app/designer/CardDesigner';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppState } from '@app/state/app.state';
import { saveCardDesign } from './state/customer.actions';

function mapStateToProps(state: AppState): CardDesignerExtendedProps {
  return {
    mode: DesignerMode.Customer,
    deleting: false,
    saveCardDesign
  };
}

export default connect(mapStateToProps)(CardDesigner);
