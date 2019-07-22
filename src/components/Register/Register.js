import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import './Register.css'
import {firebaseAuth} from "../../utility/firebaseFascade";
import {authActionCreators} from "../../actions";


export const helpers = {
  filterAlphanumerics: (val) => {
    return val.replace(/[^a-z0-9]/gi,'');
  },
  handleSubmit: async (username, dispatch, event) => {
    event.preventDefault();
    const users = await firebaseAuth.findUsersWithUsername(username);
    if (users.filter(userObj=>userObj.username === username).length >= 1){
      return alert('That username is already taken');
    }
    await firebaseAuth.setUsername(username);
    dispatch(authActionCreators.finishLogin({username}))
  }
};

export const Register = () => {
  const auth = useSelector( state => state.auth);
  const [username, setUsername] = React.useState("");
  const dispatch = useDispatch();

  if (auth.loggedIn === false){
    return null;
  }
  if (auth.username !== null || auth.loading === true) {
    return null;
  }

  return (
    <div className='screenOverlay'>
      <form className='formContainer' onSubmit={(e)=>helpers.handleSubmit(username, dispatch, e)}>
        What would you like your username to be?
        <input id='usernameInput' value={username} onChange={(e)=>setUsername(helpers.filterAlphanumerics(e.target.value))}/>
      </form>
    </div>
  )
};

export default Register;
