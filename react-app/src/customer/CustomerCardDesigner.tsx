import { connect } from 'react-redux';
import CardDesigner, { CardDesignerDispatchProps, CardDesignerConnectProps } from '@app/designer/CardDesigner';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppState } from '@app/state/app.state';
import { saveCardDesign } from './state/customer.actions';

const mapDispatchToProps: CardDesignerDispatchProps = { saveCardDesign };

function mapStateToProps(state: AppState): CardDesignerConnectProps {
  return {
    mode: DesignerMode.Customer,
    deleting: false
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
