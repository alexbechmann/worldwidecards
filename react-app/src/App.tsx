import * as React from 'react';
import { LoginContainer } from '@app/auth';
import { LinearProgress } from 'material-ui';
import { AppMenuBarContainer } from '@app/menu';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '@app/shared/router/routes';
import { ArtistDesignsBrowserConnected } from '@app/artist/ArtistDesignsBrowserConnected';
import { ArtistCardDesignerConnected } from '@app/artist/ArtistCardDesignerConnected';
import { CustomerCardDesignerConnected } from '@app/customer';
import { CustomerCardBrowserConnected } from '@app/customer/CustomerCardBrowserConnected';

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
    if (this.props.initialized) {
      return (
        <Switch>
          <Route
            exact={true}
            path={routes.artistDesigner.path}
            component={this.props.isLoggedIn ? ArtistCardDesignerConnected : LoginContainer}
          />
          <Route exact={true} path={routes.customerDesigner.path} component={CustomerCardDesignerConnected} />
          <Route
            path={routes.myDesigns.path}
            component={this.props.isLoggedIn ? ArtistDesignsBrowserConnected : LoginContainer}
          />
          <Route path={routes.customerCardBrowser.path} component={CustomerCardBrowserConnected} />
          <Route path="/" component={CustomerCardBrowserConnected} />
        </Switch>
      );
    } else {
      return <LinearProgress variant="query" />;
    }
  }
}

export default App;
