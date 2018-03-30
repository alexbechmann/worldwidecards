import * as React from 'react';
import { CardDesignerContainer } from 'src/cards';
import { LoginContainer } from 'src/auth';
import { LinearProgress } from 'material-ui';
import { AppMenuBarContainer } from 'src/menu';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from 'src/shared/router/routes';
import { MyDesignsContainer } from 'src/cards/designer/MyDesignsContainer';

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
      return (
        <BrowserRouter>
          <Switch>
            <Route exact={true} path={routes.designs.path} component={CardDesignerContainer} />
            <Route path={routes.myDesigns.path} component={MyDesignsContainer} />
            <Route path="/" component={MyDesignsContainer} />
          </Switch>
        </BrowserRouter>
      );
    } else if (!this.props.isLoggedIn && this.props.initialized) {
      return <LoginContainer />;
    } else {
      return <LinearProgress variant="query" />;
    }
  }
}

export default App;
