import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GithubLoginButton } from "react-social-login-buttons";
import './Navbar.css';
import {login, signOut} from "./helpers";
import { FaAt } from 'react-icons/fa';

export const NavbarComponent = () => {
  const loggedIn = useSelector( state => state.auth.loggedIn );
  const dispatch = useDispatch();

  return  <div className="container navbar">
    <div className="searchBar">
      <FaAt className="searchBarIcon" size={'1.9rem'} color='#777'/>
      <input className="search" placeholder='Username'/>
    </div>


    {/*Logged out nav bar items*/}
    {!loggedIn && <GithubLoginButton id="githubButton" onClick={()=>login(dispatch)}/>}

    {/*Logged in nav bar items*/}
    {!!loggedIn &&
      <div className="navbarTextContainer" id="signOut" onClick={()=>signOut(dispatch)}>
        <div className="navBarTextItem">
          Logout
        </div>
      </div>
    }
    </div>

};

export default NavbarComponent;
