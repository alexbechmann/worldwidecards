import { AppState } from '@app/shared/state';
import { MyDesignsProps, MyDesigns } from './MyDesigns';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState): MyDesignsProps {
  return {
    designs: state.artist.myDesigns,
    loading: state.artist.loadingMyDesigns
  };
}

export const ConnectedMyDesigns = connect(mapStateToProps, null)(MyDesigns);
