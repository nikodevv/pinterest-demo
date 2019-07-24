import React from 'react';
import './UserButtons.css';
import { FaRegQuestionCircle, FaPlusCircle} from 'react-icons/fa';
import * as redux from "react-redux";
import {modalActionCreators} from "../../actions";
import {useSelector} from "react-redux";

export const UserButtons = () => {
  const loggedIn = useSelector(state=>state.auth.loggedIn);
  const dispatch = redux.useDispatch();
  return <div className="userButtonsContainer">
    { loggedIn === true &&
     <FaPlusCircle id="addLink"
                  size="2rem"
                  onClick={()=>dispatch(modalActionCreators.toggleNewLinkModal())}
                  className="actionIcon"
    />
    }
    <a href='https://github.com/nikodevv/pinterest-demo' target={'_blank'}>
      <FaRegQuestionCircle size="2rem"
                           color="#333"
                           className="actionIcon"
      />
    </a>
  </div>;
};

export default UserButtons;
