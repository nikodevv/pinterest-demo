import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GithubLoginButton } from "react-social-login-buttons";
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';

import {FirebaseAuth, FirestoreData} from "../../utility/firebaseFascade";
import {authActionCreators} from "../../actions";

export const helpers = {
  login: async (dispatch) => {
    const startLoadingAction = authActionCreators.startLoading();
    dispatch(startLoadingAction);
    await FirebaseAuth.loginWithGithub();
    const loginAction = authActionCreators.login();
    dispatch(loginAction);
    const userModel = await FirestoreData.fetchOwnUserModel();
    const storeUsernameAction = authActionCreators.finishLogin(userModel);
    dispatch(storeUsernameAction);
  },
  signOut: async (dispatch) => {
    await FirebaseAuth.signOut();
    dispatch(authActionCreators.signOut());
  }
};

export const NavbarComponent = () => {
  const auth = useSelector( state => state.auth );
  const [suggestions, setSuggestions] = React.useState([]);
  const dispatch = useDispatch();
  const { loggedIn, username} = auth;

  return  <div className="transparentContainer">
    <div className="container navbar">
      { suggestions.length >= 1 &&
        suggestions
      }
    <div className="searchBar">
      <FaSearch className="searchBarIcon" size={'1.5rem'} color='#777'/>
      <input className="search" placeholder='username (ex: nikodevv)' onChange={async (val)=>{
        const response = await FirestoreData.findUsersWithUsername(val.target.value);
        console.log(response)
        // setSuggestions(response)
      }
      }/>
    </div>


    {/*Logged out nav bar items*/}
    {!loggedIn && <GithubLoginButton id="githubButton" onClick={()=>helpers.login(dispatch)}/>}

    {/*Logged in nav bar items*/}
    {!!loggedIn &&
      <div className="navbarTextContainer">
        <div className="navBarTextItem" id="signOut" onClick={()=>helpers.signOut(dispatch)}>
          Logout
        </div>
        <div className="navBarTextItem">
          ({!!username && username})
        </div>
      </div>
    }
    </div>
  </div>
};

export default NavbarComponent;
