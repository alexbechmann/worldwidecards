import * as React from 'react';
import { AppMenuBar } from 'src/menu';
import { CardEditorContainer } from 'src/cards';
import { LoginContainer } from 'src/auth';

export interface AppProps {
  isLoggedIn: boolean;
}

export interface AppDispatchProps {
  checkForCurrentUser: () => any;
}

interface Props extends AppProps, AppDispatchProps {}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.checkForCurrentUser();
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
    if (this.props.isLoggedIn) {
      return <CardEditorContainer />;
    } else {
      return <LoginContainer />;
    }
  }
}

export default App;
