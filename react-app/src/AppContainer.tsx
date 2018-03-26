import { AppState } from 'src/shared/state';
import App, { AppProps, AppDispatchProps } from './App';
import { connect } from 'react-redux';
import { checkForCurrentUser } from './auth/auth.actions';

function mapStateToProps(state: AppState): AppProps {
  return {
    isLoggedIn: state.auth.currentUser != null
  };
}

const mapDispatchToProps: AppDispatchProps = { checkForCurrentUser };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
