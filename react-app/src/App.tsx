import * as React from 'react';
import { ArtistCardDesignerContainer, MyDesignsContainer } from '@app/designer';
import { LoginContainer } from '@app/auth';
import { LinearProgress } from 'material-ui';
import { AppMenuBarContainer } from '@app/menu';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '@app/shared/router/routes';

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
        <BrowserRouter>
          <div>
            <AppMenuBarContainer />
            {this.renderApp()}
          </div>
        </BrowserRouter>
      </div>
    );
  }

  renderApp() {
    if (this.props.isLoggedIn && this.props.initialized) {
      return (
        <Switch>
          <Route exact={true} path={routes.designs.path} component={ArtistCardDesignerContainer} />
          <Route path={routes.myDesigns.path} component={MyDesignsContainer} />
          <Route path="/" component={MyDesignsContainer} />
        </Switch>
      );
    } else if (!this.props.isLoggedIn && this.props.initialized) {
      return <LoginContainer />;
    } else {
      return <LinearProgress variant="query" />;
    }
  }
}

export default App;
