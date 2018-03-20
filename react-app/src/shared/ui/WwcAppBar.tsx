import * as React from 'react';
import * as Icons from 'material-ui-icons';
import { Toolbar, AppBar, IconButton, Typography } from 'material-ui';

export const WwcAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <Icons.Menu />
        </IconButton>
        <Typography variant="title" color="inherit">
          Worldwidecards
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
