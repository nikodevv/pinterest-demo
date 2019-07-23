import React from 'react';
import './NewLink.css';

const NewLink = () => {
  return <div className="screenOverlay container-row center">
    <div className="container-column center modalContainer">
      <div className="center container-row">
        <h1>Enter a new post</h1>
      </div>
      <div className="center container-row">
        <input placeholder="image url" type="text"/>
      </div>
      <div className="center container-row">
        <input placeholder="link location" type="text"/>
      </div>
      <div className="center container-row">
        <button disabled={true}>Save</button>
      </div>
    </div>
  </div>;
};

export default NewLink;
