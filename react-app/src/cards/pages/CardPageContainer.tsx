import { AppState } from 'src/shared/state';
import { CardPage, CardPageProps, CardPageDispatchProps } from './CardPage';
import { connect } from 'react-redux';
import { Page } from '@wwc/core';
import { setEditingShape, updateShapePosition } from 'src/cards/state/card.actions';
import { combineContainers } from 'src/shared/helpers/combine-containers';
import { withTheme } from 'material-ui';

interface CardPageContainerProps {
  page: Page;
  pageIndex: number;
  cardId: string;
}

function mapStateToProps(state: AppState, ownProps: CardPageContainerProps): CardPageProps {
  const { page, pageIndex } = ownProps;
  return {
    page,
    pageIndex,
    editingShapePosition: state.card.cardDesigner.editingShapePosition,
    cardId: ownProps.cardId
  };
}

const mapDispatchToProps: CardPageDispatchProps = { setEditingShape, updateShapePosition };

export const CardPageContainer: React.ComponentType<CardPageContainerProps> = combineContainers(CardPage, [
  c => withTheme()(c),
  c => connect(mapStateToProps, mapDispatchToProps)(c)
]);
