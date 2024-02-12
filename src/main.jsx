import React from 'react'
import ReactDOM from 'react-dom/client'
// redux
import { store , persistor} from './redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

// firebase
import firebaseConfig from './firebase.config.js';

import "slick-carousel/slick/slick.css";
import App from './App.jsx'
import './assets/css/index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
