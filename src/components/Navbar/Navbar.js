import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GithubLoginButton } from "react-social-login-buttons";
import './Navbar.css';
import { FaSearch, FaNeos } from 'react-icons/fa';
import _ from 'lodash';
import { withRouter } from 'react-router';

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
  },
  findUserNames: async (setSuggestions, val) => {
    const response = await FirestoreData.findUsersWithUsername(val);
    setSuggestions(response)
  },
  navigateToProfile: (suggestions, history, e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const username = data.get('search');
        const matchingUsers = suggestions.filter((user=>user.username===username));
        if (matchingUsers.length > 0){
          history.push(`/userPage/${suggestions[0].id}`)
        }
  }


};

const Navbar = (props) => {
  const auth = useSelector( state => state.auth );
  const [suggestions, setSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const dispatch = useDispatch();
  const { loggedIn, username} = auth;

  return  <div className="transparentContainer">
    <div className="container navbar">
      <a href="/" className="logo">
      <FaNeos size="2rem"/>
      </a>
      <div className="searchBar">
        <FaSearch className="searchBarIcon" size={'1.5rem'} color='#777'/>
        <form onSubmit={(e)=>helpers.navigateToProfile(suggestions, props.history, e)}>
          <input className="search"
                 name="search"
                 placeholder='username (ex: nikodevv, testUser1)'
                 onFocus={()=>setShowSuggestions(true)}
                 onBlur={()=>setShowSuggestions(false)}
                 onChange={(e)=>_.debounce(helpers.findUserNames,250)(setSuggestions, e.target.value)}/>
        </form>
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
    { suggestions.length >= 1 && showSuggestions &&
      <div className="suggestionsContainer">
        <div className="container-row suggestions">
          <div className={"suggestionItem"}>
            {suggestions.length >= 1 &&
            suggestions.map(suggestion => suggestion.username)
            }
          </div>
        </div>
      </div>
    }
  </div>
};

export const NavbarComponent = withRouter(Navbar);
export default NavbarComponent;
