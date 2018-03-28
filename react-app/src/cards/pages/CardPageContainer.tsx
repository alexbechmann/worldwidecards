import { AppState } from 'src/shared/state';
import { CardPage, CardPageProps, CardPageDispatchProps } from './CardPage';
import { connect } from 'react-redux';
import { Page } from '@wwc/core';
import { setEditingShape, updateShapePosition } from 'src/cards/state/card.actions';

interface CardPageContainerProps {
  page: Page;
  pageIndex: number;
}

function mapStateToProps(state: AppState, ownProps: CardPageContainerProps): CardPageProps {
  const { page, pageIndex } = ownProps;
  return {
    page,
    pageIndex
  };
}

const mapDispatchToProps: CardPageDispatchProps = { setEditingShape, updateShapePosition };

export const CardPageContainer: React.ComponentType<CardPageContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardPage);
