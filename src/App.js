import React from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { PersistGate} from 'redux-persist/integration/react'
import './App.css';
import firebaseConfig from './config/firebaseConfig';
import Router from "./components/Router";
import rootReducer from './reducers'
import UserButtons from "./components/UserButtons";
import ModalsLauncher from "./components/ModalsLauncher";

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(firebaseApp);
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export const App = () => {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <div className="App">
            <ModalsLauncher/>
            <UserButtons/>
            <Router/>
          </div>
        </PersistGate>
      </Provider>
  );
};

export default App;
