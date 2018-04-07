import * as React from 'react';
import { LoginContainer } from '@app/auth';
import { LinearProgress } from 'material-ui';
import { AppMenuBarContainer } from '@app/menu';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '@app/shared/router/routes';
import { ConnectedArtistDesignsBrowser } from '@app/artist/ConnectedArtistDesignsBrowser';
import { ConnectedArtistCardDesigner } from '@app/artist/ConnectedArtistCardDesigner';
import { ConnectedCustomerCardDesigner } from '@app/customer';
import { ConnectedCustomerCardBrowser } from '@app/customer/ConnectedCustomerCardBrowser';

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
            component={this.props.isLoggedIn ? ConnectedArtistCardDesigner : LoginContainer}
          />
          <Route exact={true} path={routes.customerDesigner.path} component={ConnectedCustomerCardDesigner} />
          <Route
            path={routes.myDesigns.path}
            component={this.props.isLoggedIn ? ConnectedArtistDesignsBrowser : LoginContainer}
          />
          <Route path={routes.customerCardBrowser.path} component={ConnectedCustomerCardBrowser} />
          <Route path="/" component={ConnectedCustomerCardBrowser} />
        </Switch>
      );
    } else {
      return <LinearProgress variant="query" />;
    }
  }
}

export default App;
