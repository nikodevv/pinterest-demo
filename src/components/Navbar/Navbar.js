import * as React from 'react';
import { connect } from 'react-redux';
import { GithubLoginButton } from "react-social-login-buttons";
import './Navbar.css';
import {Dispatch} from "redux";
import {authActionCreators} from "../../actions";

export const NavbarComponent = (props) => {
  const {loggedIn, loginWithGithub} = props;

  return  <div className="container navbar">
    <input className="search"/>

    {/*Logged out nav bar items*/}
    {!loggedIn && <GithubLoginButton onClick={loginWithGithub}/>}

    {/*Logged in nav bar items*/}
    {!!loggedIn &&
      'logged in'

    }
    </div>

};

const mapState = (state) => {
  return { loggedIn: state.auth.loggedIn }
};

const mapDispatch = (dispatch) => {
  return { loginWithGithub: () => dispatch(authActionCreators.login()) }
};

export default connect(mapState, mapDispatch)(NavbarComponent);

