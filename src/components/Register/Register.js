import React, { Component } from 'react';
import {useSelector} from "react-redux";

export const Register = () => {
  const username = useSelector( state => state.auth.username);
  if (username === null) {
    return null;
  }
  return (
    <div>full page</div>
  )
}

export default Register;
