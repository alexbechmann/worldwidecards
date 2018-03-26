import { Login, LoginDispatchProps } from './Login';
import { connect } from 'react-redux';
import { loginWithFacebook } from '../state/auth.actions';

const mapDispatchToProps: LoginDispatchProps = { loginWithFacebook };

export const LoginContainer = connect(null, mapDispatchToProps)(Login);
