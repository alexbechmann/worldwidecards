import { AppState } from 'src/shared/state';
import { CardPage, CardPageProps, CardPageDispatchProps } from './CardPage';
import { connect } from 'react-redux';
import { Page } from '@wwc/core';

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

const mapDispatchToProps: CardPageDispatchProps = {};

export const CardPageContainer = connect(mapStateToProps, mapDispatchToProps)(CardPage);
