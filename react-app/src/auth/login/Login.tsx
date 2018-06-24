import * as React from 'react';
import { Button } from '@material-ui/core';
import { loginWithFacebook } from '@app/auth/state/auth.actions';
import { connect } from 'react-redux';
import { ConnectedReduxProps } from '@app/state/connected-redux-props';

interface Props extends ConnectedReduxProps {}

class LoginComponent extends React.Component<Props> {
  render() {
    return (
      <div>
        <Button onClick={() => this.props.dispatch(loginWithFacebook())}>Login with Facebook</Button>
      </div>
    );
  }
}

export default connect()(LoginComponent);
