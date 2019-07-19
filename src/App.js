import React from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import { Provider } from 'react-redux';
import './App.css';
import firebaseConfig from './config/firebaseConfig';
import Router from "./components/Router";
import {createStore} from "redux";
import rootReducer from './reducers'

firebase.initializeApp(firebaseConfig);
const store = createStore(rootReducer);

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
