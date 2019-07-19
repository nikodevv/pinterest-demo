import * as React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "../Navbar";

export const Router = () => {
  return <BrowserRouter>
    <div className="container-column center">
      <Navbar/>
      <Switch>
        <Route path='/' exact={true}>
        </Route>
        <Route path='/2'>
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
};

export default Router;
