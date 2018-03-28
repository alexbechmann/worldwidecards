import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { IconButton } from 'material-ui';
import * as Icons from 'material-ui-icons';

type ClassNames = 'button' | 'input';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

interface Props {}

interface StyledProps extends Props, WithStyles<ClassNames> {}

export const ImageControls: React.ComponentType<Props> = withStyles(styles)(
  class ImageControlsComponent extends React.Component<StyledProps> {
    render() {
      const { classes } = this.props;
      return (
        <div>
          <IconButton className={classes.button} aria-label="Delete">
            <Icons.Delete />
          </IconButton>
          <IconButton className={classes.button} aria-label="Delete" color="primary">
            <Icons.Delete />
          </IconButton>
          <IconButton color="secondary" className={classes.button} aria-label="Add an alarm">
            <Icons.Alarm />
          </IconButton>
          <IconButton color="primary" className={classes.button} aria-label="Add to shopping cart">
            <Icons.AddShoppingCart />
          </IconButton>
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" className={classes.button} component="span">
              <Icons.PhotoCamera />
            </IconButton>
          </label>
        </div>
      );
    }
  }
);
