import * as React from 'react';
import './App.css';
import { AppMenuBar } from 'src/menu';
import { CardEditorContainer } from 'src/cards';
import { Provider } from 'react-redux';
import { store } from 'src/shared/state';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppMenuBar isLoggedIn={false} logout={() => null} />
        <Provider store={store}>
          <CardEditorContainer />
        </Provider>
      </div>
    );
  }
}

export default App;
