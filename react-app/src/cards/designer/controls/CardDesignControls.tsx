import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { Typography, IconButton } from 'material-ui';
import * as Icons from 'material-ui-icons';
import { Card } from '@wwc/core';
import { UserInfo } from 'firebase';

type ClassNames = 'button' | 'input';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

export interface CardDesignControlsDispatchProps {
  saveCardDesign: (user: UserInfo, card: Card) => any;
}

export interface CardDesignControlsProps {
  currentUser?: UserInfo;
  card?: Card;
  saving: boolean;
}

interface Props extends CardDesignControlsDispatchProps, CardDesignControlsProps {}

interface StyledProps extends Props, WithStyles<ClassNames> {}

export const CardDesignControls: React.ComponentType<Props> = withStyles(styles)(
  class CardDesignControlsComponent extends React.Component<StyledProps> {
    render() {
      const { classes } = this.props;
      return (
        <div>
          <Typography variant="caption">Add item</Typography>
          <div>
            {/* <IconButton className={classes.button} aria-label="Add text box">
              <Icons.AddCircle />
            </IconButton> */}
            <IconButton
              disabled={this.props.saving}
              className={classes.button}
              aria-label="Save design"
              onClick={() => this.props.saveCardDesign(this.props.currentUser!, this.props.card!)}
            >
              <Icons.Save />
            </IconButton>
          </div>
        </div>
      );
    }
  }
);
