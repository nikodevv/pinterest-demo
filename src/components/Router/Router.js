import * as React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "../Navbar";
import UserPage from "../UserPage";

export const Router = () => {
  return <BrowserRouter>
    <div className="container-column center">
      <Navbar/>
      <Switch>
        <Route path='/' exact={true}/>
        <Route path='/userPage/:userId' component={UserPage}/>
      </Switch>
    </div>
  </BrowserRouter>
};

export default Router;
