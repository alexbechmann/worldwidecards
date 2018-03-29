import * as React from 'react';
import { CardDesignerContainer } from 'src/cards';
import { LoginContainer } from 'src/auth';
import { CircularProgress } from 'material-ui';
import { AppMenuBarContainer } from 'src/menu';

export interface AppProps {
  isLoggedIn: boolean;
  initialized: boolean;
}

export interface AppDispatchProps {
  initAuth: () => any;
}

interface Props extends AppProps, AppDispatchProps {}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.initAuth();
  }

  render() {
    return (
      <div className="App">
        <AppMenuBarContainer />
        {this.renderApp()}
      </div>
    );
  }

  renderApp() {
    if (this.props.isLoggedIn && this.props.initialized) {
      return <CardDesignerContainer />;
    } else if (!this.props.isLoggedIn && this.props.initialized) {
      return <LoginContainer />;
    } else {
      return <CircularProgress />;
    }
  }
}

export default App;
