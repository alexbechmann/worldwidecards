import { StyleRulesCallback, Theme } from 'material-ui';

export type CardEditorClassNames = 'root';

export const cardEditorStyles: StyleRulesCallback<CardEditorClassNames> = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  }
});
