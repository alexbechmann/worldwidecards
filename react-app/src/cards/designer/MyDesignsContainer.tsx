import { AppState } from 'src/shared/state';
import { MyDesignsProps, MyDesigns } from './MyDesigns';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState): MyDesignsProps {
  return {
    designs: state.card.myDesigns,
    loading: state.card.loadingMyDesigns
  };
}

export const MyDesignsContainer = connect(mapStateToProps, null)(MyDesigns);
