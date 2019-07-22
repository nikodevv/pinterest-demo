import React from 'react';
import {useSelector} from "react-redux";
import './Register.css'

export const filterAlphanumerics = (val) => {
  return val.replace(/[^a-z0-9]/gi,'');
};

export const Register = () => {
  const auth = useSelector( state => state.auth);
  const [username, setUsername] = React.useState("");

  if (auth.loggedIn === false){
    return null;
  }
  if (auth.username !== null || auth.loading === true) {
    return null;
  }

  return (
    <div className='screenOverlay'>
      <form className='formContainer' onSubmit={()=>console.log('clicked')}>
        <input id='usernameInput' value={username} onChange={(e)=>setUsername(filterAlphanumerics(e.target.value))}/>
      </form>
    </div>
  )
};

export default Register;
