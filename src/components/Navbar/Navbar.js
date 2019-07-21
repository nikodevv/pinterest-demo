import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GithubLoginButton } from "react-social-login-buttons";
import './Navbar.css';
import {login} from "./helpers";

export const NavbarComponent = () => {
  const loggedIn = useSelector( state => state.auth.loggedIn );
  const dispatch = useDispatch();

  return  <div className="container navbar">
    <input className="search"/>

    {/*Logged out nav bar items*/}
    {!loggedIn && <GithubLoginButton id="githubButton" onClick={()=>login(dispatch)}/>}

    {/*Logged in nav bar items*/}
    {!!loggedIn &&
      'logged in'

    }
    </div>

};

export default NavbarComponent;
