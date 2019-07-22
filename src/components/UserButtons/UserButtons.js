import React, { Component } from 'react';
import './UserButtons.css';
import { FaRegQuestionCircle } from 'react-icons/fa';
import {configure} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";

configure({adapter: new Adapter()});

class UserButtons extends Component {
  render() {
    return <div className="userButtonsContainer">
      <a href='https://github.com/nikodevv/pinterest-demo' target={'_blank'}>
        <FaRegQuestionCircle size="2rem" color="#333"/>
      </a>
    </div>;
  }
}

export default UserButtons;
