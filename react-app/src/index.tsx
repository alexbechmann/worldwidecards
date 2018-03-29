import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'src/shared/styles/index.css';
import * as firebase from 'firebase';
import { AppContainer } from './AppContainer';
import { Provider } from 'react-redux';
import { store } from 'src/shared/state';
import 'typeface-roboto';
import { cardWatcher } from 'src/cards/state/card.watcher';

var config = {
  apiKey: 'AIzaSyBxBsgZ0TwAhsItBpqPZdwKKjQkch72FF4',
  authDomain: 'worldwidecards-dev.firebaseapp.com',
  databaseURL: 'https://worldwidecards-dev.firebaseio.com',
  projectId: 'worldwidecards-dev',
  storageBucket: 'worldwidecards-dev.appspot.com',
  messagingSenderId: '764474237794'
};
firebase.initializeApp(config);

cardWatcher.startWatching();

const Root = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
