import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { Button } from 'material-ui';
import { Card } from '@wwc/core';
import { UserInfo } from 'firebase';
import { AddTextShapeArgs } from 'src/cards/designer/state/designer.action-types';

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
  addTextShape: (args: AddTextShapeArgs) => any;
}

export interface CardDesignControlsProps {
  currentUser?: UserInfo;
  card?: Card;
  saving: boolean;
  activePageIndex: number;
}

interface Props extends CardDesignControlsDispatchProps, CardDesignControlsProps {}

interface StyledProps extends Props, WithStyles<ClassNames> {}

export const CardDesignControls: React.ComponentType<Props> = withStyles(styles)(
  class CardDesignControlsComponent extends React.Component<StyledProps> {
    render() {
      const { classes } = this.props;
      return (
        <div>
          <div>
            <Button
              className={classes.button}
              aria-label="Add text box"
              onClick={() =>
                this.props.addTextShape({
                  pageIndex: this.props.activePageIndex
                })
              }
            >
              Add text box
            </Button>
            <Button
              disabled={this.props.saving}
              className={classes.button}
              aria-label="Save design"
              onClick={() => this.props.saveCardDesign(this.props.currentUser!, this.props.card!)}
            >
              Save
            </Button>
          </div>
        </div>
      );
    }
  }
);
