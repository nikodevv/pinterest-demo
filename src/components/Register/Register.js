import React, { Component } from 'react';
import {useSelector} from "react-redux";

export const Register = () => {
  const auth = useSelector( state => state.auth);
  console.log(auth);
  if (auth.username !== null || auth.loading === true) {
    return null;
  }
  return (
    <div>full page</div>
  )
}

export default Register;
