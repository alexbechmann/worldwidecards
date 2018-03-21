import * as React from 'react';
import './App.css';
import { Grid } from 'material-ui';
import { AppMenuBar } from 'src/menu';
import { CardEditor } from 'src/cards';
import { Card } from '@core/index';

class App extends React.Component {
  render() {
    const card: Card = {
      title: 'sample card title',
      frontPage: {
        texts: [],
        images: []
      }
    };
    return (
      <div className="App">
        <AppMenuBar isLoggedIn={false} logout={() => null} />
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
