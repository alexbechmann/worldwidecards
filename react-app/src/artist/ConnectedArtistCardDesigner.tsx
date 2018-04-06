import { connect } from 'react-redux';
import { saveCardDesign } from '@app/artist/state/artist.actions';
import {
  ConnectedCardDesigner,
  ConnectedCardDesignerDispatchProps,
  ConnectedCardDesignerProps
} from '@app/designer/ConnectedCardDesigner';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppState } from '@app/shared/state';

const mapDispatchToProps: ConnectedCardDesignerDispatchProps = { saveCardDesign };

function mapStateToProps(state: AppState): ConnectedCardDesignerProps {
  return {
    mode: DesignerMode.Artist
  };
}

export const ConnectedArtistCardDesigner = connect(mapStateToProps, mapDispatchToProps)(ConnectedCardDesigner);
