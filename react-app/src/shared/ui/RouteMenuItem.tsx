import * as React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from 'material-ui';
import { MenuItemProps } from 'material-ui/Menu';

interface Props extends MenuItemProps {
  to: string;
}

export const RouteMenuItem = (props: Props) => {
  const RouteLink = (p: any) => <Link {...p} />;
  return (
    <MenuItem {...props} component={RouteLink} button={true}>
      {props.children}
    </MenuItem>
  );
};
