import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';

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
      return <div>image controls...</div>;
    }
  }
);
