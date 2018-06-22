import * as React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import { MenuItemProps } from '@material-ui/core/MenuItem';

interface Props extends MenuItemProps {
  to: string;
}

export default (props: Props) => {
  const RouteLink = (p: any) => <Link {...p} />;
  return (
    <MenuItem {...props} component={RouteLink} button={true}>
      {props.children}
    </MenuItem>
  );
};
