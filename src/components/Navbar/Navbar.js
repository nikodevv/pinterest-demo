import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GithubLoginButton } from "react-social-login-buttons";
import './Navbar.css';
import {login, signOut} from "./helpers";
import { FaSearch } from 'react-icons/fa';

export const NavbarComponent = () => {
  const auth = useSelector( state => state.auth );
  const dispatch = useDispatch();
  const { loggedIn, username} = auth;

  return  <div className="container navbar">
    <div className="searchBar">
      <FaSearch className="searchBarIcon" size={'1.5rem'} color='#777'/>
      <input className="search" placeholder='username'/>
    </div>


    {/*Logged out nav bar items*/}
    {!loggedIn && <GithubLoginButton id="githubButton" onClick={()=>login(dispatch)}/>}

    {/*Logged in nav bar items*/}
    {!!loggedIn &&
      <div className="navbarTextContainer">
        <div className="navBarTextItem" id="signOut" onClick={()=>signOut(dispatch)}>
          Logout
        </div>
        <div className="navBarTextItem">
          ({!!username && username})
        </div>
      </div>
    }
    </div>

};

export default NavbarComponent;
