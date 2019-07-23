import React from 'react';
import {useDispatch} from "react-redux";
import './Register.css'
import {firebaseAuth} from "../../utility/firebaseFascade";
import {authActionCreators, modalActionCreators} from "../../actions";


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
    dispatch(modalActionCreators.toggleRegisterModal());
    dispatch(authActionCreators.finishLogin({username}))
  }
};

export const Register = () => {
  const [username, setUsername] = React.useState("");
  const dispatch = useDispatch();

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
