import React from 'react';
import './NewLink.css';

const helpers = {
  saveLink: (imgUrl, linkUrl)=>{

  }
};

const NewLink = () => {
  const [imgUrl, setImgUrl] = React.useState('');
  const [linkUrl, setLinkUrl] = React.useState('');
  return <div className="screenOverlay container-row center">
    <div className="container-column center modalContainer">
      <div className="center container-row">
        <h1>Enter a new post</h1>
      </div>
      <div className="center container-row">
        <input placeholder="image url" type="text" onChange={(e)=>setImgUrl(e.target.value)}/>
      </div>
      <div className="center container-row">
        <input placeholder="link location" type="text" onChange={(e)=>setLinkUrl(e.target.value)}/>
      </div>
      <div className="center container-row">
        <button disabled={(!linkUrl || !imgUrl)}>Save</button>
      </div>
    </div>
  </div>;
};

export default NewLink;
