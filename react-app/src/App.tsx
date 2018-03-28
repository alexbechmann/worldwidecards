import * as React from 'react';
import { AppMenuBar } from 'src/menu';
import { CardDesignerContainer } from 'src/cards';
import { LoginContainer } from 'src/auth';
import { CircularProgress } from 'material-ui';

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
        <AppMenuBar isLoggedIn={this.props.isLoggedIn} logout={() => null} />
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
