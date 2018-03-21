import * as React from 'react';
import {
  AppBar,
  MenuItem,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText
} from 'material-ui';
import * as Icons from 'material-ui-icons';

export interface AppMenuBarProps {
  isLoggedIn: boolean;
}

export interface AppMenuBarDispatchProps {
  logout: () => any;
}

interface Props extends AppMenuBarProps, AppMenuBarDispatchProps {}

interface State {
  showDrawer: boolean;
}

export class AppMenuBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDrawer: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleMenu} color="inherit" aria-label="Menu">
              <Icons.Menu />
            </IconButton>
            <Typography variant="title" color="inherit">
              Worldwidecards
            </Typography>
          </Toolbar>
        </AppBar>
        {this.renderSideDrawer()}
      </div>
    );
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
