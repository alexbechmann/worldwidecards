import * as React from 'react';
import './App.css';
import { Grid } from 'material-ui';
import { WwcAppBar } from 'src/shared/ui';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <WwcAppBar />
        <Grid container={true}>
          <Grid item={true}>asdf</Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
