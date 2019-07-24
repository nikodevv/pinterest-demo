import React from 'react';
import * as redux from "react-redux";
import {Register} from "../Register/Register";
import NewLink from "../NewLink";
import CopyLink from "../CopyLink";


const ModalsLauncher = () => {
  const modals = redux.useSelector( state => state.modals);
  // The register component is a "special" modal that depends on the state of user's auth as opposed to state.modals.
  // It contains its own logic for whether it should be rendered or not.
  if (modals.showRegisterModal === true) {
    return <Register/>
  }
  else if (modals.showNewLinkModal === true) {
    return <NewLink/>
  }
  else if (modals.showShortLinkModal === true){
    return <CopyLink link={modals.shortLink}/>
  }
  return null;
};

export default ModalsLauncher;
