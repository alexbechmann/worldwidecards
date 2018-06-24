import * as React from 'react';
import Login from '@app/auth/login/Login';
import { LinearProgress } from '@material-ui/core';
import AppMenuBar from '@app/menu/AppMenuBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '@app/shared/router/routes';
import ArtistDesignsBrowser from '@app/artist/ArtistDesignsBrowser';
import ArtistCardDesigner from '@app/artist/ArtistCardDesigner';
import CustomerCardDesigner from '@app/customer/CustomerCardDesigner';
import CustomerCardBrowser from '@app/customer/CustomerCardBrowser';
import { initAuth } from '@app/auth/state/auth.actions';
import { AppState } from '@app/state/app.state';
import { connect } from 'react-redux';
import { ConnectedReduxProps } from '@app/state/connected-redux-props';

export interface AppProps {
  isLoggedIn: boolean;
  initialized: boolean;
}

interface Props extends AppProps, ConnectedReduxProps {}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(initAuth());
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
            component={this.props.isLoggedIn ? ArtistCardDesigner : Login}
          />
          <Route exact={true} path={routes.customerDesigner.path} component={CustomerCardDesigner} />
          <Route path={routes.myDesigns.path} component={this.props.isLoggedIn ? ArtistDesignsBrowser : Login} />
          <Route path={routes.customerCardBrowser.path} component={CustomerCardBrowser} />
          <Route path="/" component={CustomerCardBrowser} />
        </Switch>
      );
    } else {
      return <LinearProgress variant="query" />;
    }
  }
}

function mapStateToProps(state: AppState): AppProps {
  return {
    isLoggedIn: state.auth.currentUser != null,
    initialized: state.auth.initialized
  };
}

export default connect(mapStateToProps)(App);
