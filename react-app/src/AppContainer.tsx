import { AppState } from '@app/state';
import App, { AppProps, AppDispatchProps } from './App';
import { connect } from 'react-redux';
import { initAuth } from './auth/state/auth.actions';

function mapStateToProps(state: AppState): AppProps {
  return {
    isLoggedIn: state.auth.currentUser != null,
    initialized: state.auth.initialized
  };
}

const mapDispatchToProps: AppDispatchProps = { initAuth };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
