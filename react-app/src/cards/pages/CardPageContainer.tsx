import { AppState } from '@app/shared/state';
import { CardPage, CardPageProps, CardPageDispatchProps } from './CardPage';
import { connect } from 'react-redux';
import { Page } from '@wwc/core';
import { combineContainers } from '@app/shared/helpers/combine-containers';
import { withTheme } from 'material-ui';
import { setEditingShape, updateShapePosition } from '@app/designer/state/designer.actions';

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
    editingShapePosition: state.designer.editingShapePosition,
    cardId: ownProps.cardId,
    editable: ownProps.editable,
    mode: state.designer.activeCardDesignMode
  };
}

const mapDispatchToProps: CardPageDispatchProps = { setEditingShape, updateShapePosition };

export const CardPageContainer: React.ComponentType<CardPageContainerProps> = combineContainers(CardPage, [
  c => withTheme()(c),
  c => connect(mapStateToProps, mapDispatchToProps)(c)
]);
