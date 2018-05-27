import * as React from 'react';
import { LoginContainer } from '@app/auth';
import { LinearProgress } from 'material-ui';
import { AppMenuBar } from '@app/menu/AppMenuBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '@app/shared/router/routes';
import { ArtistDesignsBrowserConnected } from '@app/artist/ArtistDesignsBrowserConnected';
import { ArtistCardDesigner } from '@app/artist/ArtistCardDesigner';
import { CustomerCardDesigner } from '@app/customer/CustomerCardDesigner';
import { CustomerCardBrowser } from '@app/customer/CustomerCardBrowser';

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
            <AppMenuBar />
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
            component={this.props.isLoggedIn ? ArtistCardDesigner : LoginContainer}
          />
          <Route exact={true} path={routes.customerDesigner.path} component={CustomerCardDesigner} />
          <Route
            path={routes.myDesigns.path}
            component={this.props.isLoggedIn ? ArtistDesignsBrowserConnected : LoginContainer}
          />
          <Route path={routes.customerCardBrowser.path} component={CustomerCardBrowser} />
          <Route path="/" component={CustomerCardBrowser} />
        </Switch>
      );
    } else {
      return <LinearProgress variant="query" />;
    }
  }
}

export default App;
