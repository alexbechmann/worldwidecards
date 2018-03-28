import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { IconButton } from 'material-ui';
import * as Icons from 'material-ui-icons';

type ClassNames = 'button' | 'input';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  }
});

interface Props {}

interface StyledProps extends Props, WithStyles<ClassNames> {}

export const TextControls: React.ComponentType<Props> = withStyles(styles)(
  class TextControlsComponent extends React.Component<StyledProps> {
    render() {
      const { classes } = this.props;
      return (
        <div>
          <IconButton className={classes.button} aria-label="Delete">
            <Icons.Delete />
          </IconButton>
          <IconButton className={classes.button} aria-label="Delete" color="primary">
            <Icons.Edit />
          </IconButton>
          <IconButton color="secondary" className={classes.button} aria-label="Add an alarm">
            <Icons.Alarm />
          </IconButton>
          <IconButton color="primary" className={classes.button} aria-label="Add to shopping cart">
            <Icons.AddShoppingCart />
          </IconButton>
        </div>
      );
    }
  }
);
