import * as React from 'react';
import {
  Hidden,
  Avatar,
  AppBar,
  MenuItem,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  Theme,
  StyleRulesCallback
} from 'material-ui';
import * as Icons from '@material-ui/icons';
import { routes } from '@app/shared/router/routes';
import { RouteButton } from '@app/shared/ui';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { UserInfo } from 'firebase';
import { RouteMenuItem } from '@app/shared/ui/RouteMenuItem';
import { AppState } from '@app/state/app.state';
import { logout } from '@app/auth/state/auth.actions';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';

interface AppMenuBarComponentProps {
  isLoggedIn: boolean;
  currentUser?: UserInfo;
}

interface AppMenuBarComponentDispatchProps {
  logout: () => any;
}

interface Props extends AppMenuBarComponentProps, AppMenuBarComponentDispatchProps, WithStyles<StyleClassNames> {}

interface State {
  showDrawer: boolean;
}

type StyleClassNames = 'root' | 'flex' | 'avatar';

const styles: StyleRulesCallback<StyleClassNames> = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  avatar: {
    marginLeft: theme.spacing.unit
  }
});

class AppMenuBarComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDrawer: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleMenu} color="inherit" aria-label="Menu">
              <Icons.Menu />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Worldwidecards
            </Typography>
            <Hidden smDown={true}>
              <RouteButton color="inherit" to={routes.customerCardBrowser.build()}>
                Cards
              </RouteButton>
              <RouteButton color="inherit" to={routes.myDesigns.build()}>
                My Designs
              </RouteButton>
              <RouteButton color="inherit" to={routes.customerDesigner.build()}>
                New Card
              </RouteButton>
            </Hidden>
            {this.renderAvatar()}
          </Toolbar>
        </AppBar>
        {this.renderSideDrawer()}
      </div>
    );
  }

  renderAvatar() {
    if (this.props.currentUser) {
      return this.props.currentUser.photoURL ? (
        <Avatar className={this.props.classes.avatar} src={this.props.currentUser.photoURL} />
      ) : null;
    }
    return null;
  }

  toggleMenu() {
    this.setState({
      showDrawer: !this.state.showDrawer
    });
  }

  renderSideDrawer() {
    return this.props.isLoggedIn ? (
      <Drawer open={this.state.showDrawer} onClose={this.toggleMenu}>
        <RouteMenuItem onClick={this.toggleMenu} to={routes.customerCardBrowser.build()}>
          <ListItemIcon>
            <Icons.Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </RouteMenuItem>
        <RouteMenuItem color="inherit" to={routes.customerCardBrowser.build()} onClick={this.toggleMenu}>
          Cards
        </RouteMenuItem>
        <RouteMenuItem color="inherit" to={routes.myDesigns.build()} onClick={this.toggleMenu}>
          My Designs
        </RouteMenuItem>
        <RouteMenuItem color="inherit" to={routes.customerDesigner.build()} onClick={this.toggleMenu}>
          New Card
        </RouteMenuItem>
        <Divider />
        <MenuItem onClick={this.logout}>Logout</MenuItem>
        <Divider />
        <MenuItem onClick={this.toggleMenu}>Close</MenuItem>
      </Drawer>
    ) : (
      <Drawer open={this.state.showDrawer} onClose={this.toggleMenu}>
        <MenuItem onClick={this.toggleMenu}>Close</MenuItem>
      </Drawer>
    );
  }

  logout() {
    this.props.logout();
    this.toggleMenu();
  }
}

function mapStateToProps(state: AppState): AppMenuBarComponentProps {
  return {
    isLoggedIn: state.auth.currentUser != null,
    currentUser: state.auth.currentUser
  };
}

const mapDispatchToProps: AppMenuBarComponentDispatchProps = { logout };

export const AppMenuBar = combineContainers(AppMenuBarComponent, [
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
]);
