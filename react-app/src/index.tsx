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
  apiKey: process.env.FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_CONFIG_DATABASE_URL,
  projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID
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
