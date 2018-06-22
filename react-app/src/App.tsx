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

export interface AppComponentProps {
  isLoggedIn: boolean;
  initialized: boolean;
}

export interface AppComponentDispatchProps {
  initAuth: () => any;
}

interface Props extends AppComponentProps, AppComponentDispatchProps {}

class AppComponent extends React.Component<Props> {
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

function mapStateToProps(state: AppState): AppComponentProps {
  return {
    isLoggedIn: state.auth.currentUser != null,
    initialized: state.auth.initialized
  };
}

const mapDispatchToProps: AppComponentDispatchProps = { initAuth };

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
