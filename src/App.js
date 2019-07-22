import React from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import './App.css';
import firebaseConfig from './config/firebaseConfig';
import Router from "./components/Router";
import rootReducer from './reducers'

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(firebaseApp);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const App = () => {
  return (
      <Provider store={store}>
        <div className="App">
          <Router/>
        </div>
      </Provider>
  );
};

export default App;
