import * as React from 'react';
import './App.css';
import { Grid } from 'material-ui';
import { WwcAppBar } from 'src/shared/ui';
import { CardEditor } from 'src/cards';
import { Card } from '@core/index';

class App extends React.Component {
  render() {
    const card: Card = {
      title: 'sample card title'
    };
    return (
      <div className="App">
        <WwcAppBar />
        <Grid container={true}>
          <Grid item={true}>
            <CardEditor card={card} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
