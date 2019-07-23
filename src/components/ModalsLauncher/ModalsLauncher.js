import React from 'react';
import * as redux from "react-redux";
import {Register} from "../Register/Register";


const ModalsLauncher = () => {
  const modals = redux.useSelector( state => state.modals);
  // The register component is a "special" modal that depends on the state of user's auth as opposed to state.modals.
  // It contains its own logic for whether it should be rendered or not.
  if (modals.showRegisterModal === true) {
    return <Register/>
  }
  else if (modals.showNewLinkModal === true) {
    return <div className="screenOverlay">ModalsLauncher</div>
  }
  return null;
};

export default ModalsLauncher;
