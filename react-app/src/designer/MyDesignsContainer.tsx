import { AppState } from '@app/shared/state';
import { MyDesignsProps, MyDesigns } from './MyDesigns';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState): MyDesignsProps {
  return {
    designs: state.designer.myDesigns,
    loading: state.designer.loadingMyDesigns
  };
}

export const MyDesignsContainer = connect(mapStateToProps, null)(MyDesigns);
