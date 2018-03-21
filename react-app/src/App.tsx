import * as React from 'react';
import './App.css';
import { Grid } from 'material-ui';
import { AppMenuBar } from 'src/menu';
import { CardEditorContainer } from 'src/cards';
import { Provider } from 'react-redux';
import { store } from 'src/shared/state';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppMenuBar isLoggedIn={false} logout={() => null} />
        <Grid container={true}>
          <Grid item={true}>
            <Provider store={store}>
              <CardEditorContainer />
            </Provider>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
