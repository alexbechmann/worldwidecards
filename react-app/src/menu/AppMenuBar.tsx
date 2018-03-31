import * as React from 'react';
import {
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
import * as Icons from 'material-ui-icons';
import { routes } from '@app/shared/router/routes';
import { RouteButton } from '@app/shared/ui';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { UserInfo } from 'firebase';

export interface AppMenuBarProps {
  isLoggedIn: boolean;
  currentUser?: UserInfo;
}

export interface AppMenuBarDispatchProps {
  logout: () => any;
}

interface Props extends AppMenuBarProps, AppMenuBarDispatchProps {}

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

interface StyledProps extends Props, WithStyles<StyleClassNames> {}

export const AppMenuBar: React.ComponentType<Props> = withStyles(styles, { withTheme: true })(
  class AppMenuBarComponent extends React.Component<StyledProps, State> {
    constructor(props: StyledProps) {
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
              {this.renderNavButtons()}
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

    renderNavButtons() {
      if (this.props.isLoggedIn) {
        return (
          <div>
            <RouteButton color="inherit" to={routes.myDesigns.build()}>
              My Designs
            </RouteButton>
          </div>
        );
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
          <MenuItem onClick={this.toggleMenu}>
            <ListItemIcon>
              <Icons.Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </MenuItem>
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
);
