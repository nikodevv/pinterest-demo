import React from 'react';
import './NewLink.css';
import {firebaseAuth} from "../../utility/firebaseFascade";
import {modalActionCreators} from "../../actions";
import {useDispatch} from "react-redux";

const helpers = {
  saveLink: (imgUrl, linkUrl, dispatch)=>{
    firebaseAuth.addPost({
      imgUrl,
      linkUrl
    });
    dispatch(modalActionCreators.toggleNewLinkModal())
  }
};

const NewLink = () => {
  const [imgUrl, setImgUrl] = React.useState('');
  const [linkUrl, setLinkUrl] = React.useState('');
  const dispatch = useDispatch();
  return <div className="screenOverlay container-row center"
              onClick={(e) => {
                if (e.currentTarget === e.target){
                  dispatch(modalActionCreators.toggleNewLinkModal());
                }
              }}>
    <div className="container-column center modalContainer" onClick={(e)=>e.preventDefault()}>
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
        <button disabled={(!linkUrl || !imgUrl)}
                onClick={(e)=>{{
                  e.preventDefault();
                  helpers.saveLink(imgUrl, linkUrl, dispatch)
                }}}>
          Save
        </button>
      </div>
    </div>
  </div>;
};

export default NewLink;
