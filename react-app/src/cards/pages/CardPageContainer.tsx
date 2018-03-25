import { AppState } from 'src/shared/state';
import { CardPage, CardPageProps, CardPageDispatchProps } from './CardPage';
import { connect } from 'react-redux';
import { updateShapePosition } from '../card.actions';
import { Page } from '@wwc/core';

interface CardPageContainerProps {
  page: Page;
  pageName: string;
}

function mapStateToProps(state: AppState, ownProps: CardPageContainerProps): CardPageProps {
  const { page, pageName } = ownProps;
  return {
    page,
    pageName
  };
}

const mapDispatchToProps: CardPageDispatchProps = { updateShapePosition };

export const CardPageContainer = connect(mapStateToProps, mapDispatchToProps)(CardPage);
