import * as React from 'react';
import { Button } from 'material-ui';

export interface LoginDispatchProps {
  loginWithFacebook: () => any;
}

export class Login extends React.Component<LoginDispatchProps> {
  render() {
    return (
      <div>
        <Button onClick={this.props.loginWithFacebook}>Login with Facebook</Button>
      </div>
    );
  }
}
