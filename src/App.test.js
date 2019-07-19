import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configure} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
