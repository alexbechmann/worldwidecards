import { AppMenuBar, AppMenuBarProps, AppMenuBarDispatchProps } from './AppMenuBar';
import { AppState } from '@app/state';
import { logout } from '@app/auth/state/auth.actions';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState): AppMenuBarProps {
  return {
    isLoggedIn: state.auth.currentUser != null,
    currentUser: state.auth.currentUser
  };
}

const mapDispatchToProps: AppMenuBarDispatchProps = { logout };

export const AppMenuBarContainer = connect(mapStateToProps, mapDispatchToProps)(AppMenuBar);
