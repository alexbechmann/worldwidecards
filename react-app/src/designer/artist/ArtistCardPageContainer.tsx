import { AppState } from '@app/shared/state';
import { connect } from 'react-redux';
import { Page } from '@wwc/core';
import { combineContainers } from '@app/shared/helpers/combine-containers';
import { withTheme } from 'material-ui';
import { CardPageProps, CardPageDispatchProps, CardPage } from '@app/cards/pages/CardPage';
import { setEditingShape, updateShapePosition } from '@app/designer/artist/state/artist-designer.actions';

interface CardPageContainerProps {
  page: Page;
  pageIndex: number;
  cardId: string;
  editable: boolean;
}

function mapStateToProps(state: AppState, ownProps: CardPageContainerProps): CardPageProps {
  const { page, pageIndex } = ownProps;
  return {
    page,
    pageIndex,
    editingShapePosition: state.artistDesigner.editingShapePosition,
    cardId: ownProps.cardId,
    editable: ownProps.editable
  };
}

const mapDispatchToProps: CardPageDispatchProps = { setEditingShape, updateShapePosition };

export const ArtistCardPageContainer: React.ComponentType<CardPageContainerProps> = combineContainers(CardPage, [
  c => withTheme()(c),
  c => connect(mapStateToProps, mapDispatchToProps)(c)
]);
