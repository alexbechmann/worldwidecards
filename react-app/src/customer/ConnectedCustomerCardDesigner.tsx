import { connect } from 'react-redux';
import {
  ConnectedCardDesigner,
  ConnectedCardDesignerDispatchProps,
  ConnectedCardDesignerProps
} from '@app/designer/ConnectedCardDesigner';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppState } from '@app/shared/state';
import { UserInfo } from 'firebase';
import { Card } from '@wwc/core';

const saveCardDesign = (user: UserInfo, card: Card) => {
  console.log(`Saving fake card`, card);
};

const mapDispatchToProps: ConnectedCardDesignerDispatchProps = { saveCardDesign };

function mapStateToProps(state: AppState): ConnectedCardDesignerProps {
  return {
    mode: DesignerMode.Customer
  };
}

export const ConnectedCustomerCardDesigner = connect(mapStateToProps, mapDispatchToProps)(ConnectedCardDesigner);
