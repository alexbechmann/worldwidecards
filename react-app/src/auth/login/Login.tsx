import * as React from 'react';
import { Button } from '@material-ui/core';
import { loginWithFacebook } from '@app/auth/state/auth.actions';
import { connect } from 'react-redux';

interface LoginLoginComponentDispatchProps {
  loginWithFacebook: () => any;
}

interface Props extends LoginLoginComponentDispatchProps {}

class LoginComponent extends React.Component<Props> {
  render() {
    return (
      <div>
        <Button onClick={this.props.loginWithFacebook}>Login with Facebook</Button>
      </div>
    );
  }
}

const mapDispatchToProps: LoginLoginComponentDispatchProps = { loginWithFacebook };

export default connect(null, mapDispatchToProps)(LoginComponent);
