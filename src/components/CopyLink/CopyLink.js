import React from 'react';
import CopyText from "react-copy-text";
import {useDispatch} from "react-redux";
import {modalActionCreators} from "../../actions";

const CopyLink = (props) => {
  const [textToCopy, setTextToCopy] = React.useState(null);
  const dispatch = useDispatch();
  return <div className="screenOverlay container-row center"
              onClick={(e) => {
                if (e.currentTarget === e.target){
                  dispatch(modalActionCreators.toggleShortLinkModal());
                }
    }}>
    <div className="container-column center modalContainer">
      <div className="center container-row">
        <CopyText text={textToCopy} />
        {props.link}
      </div>
      <div className="center container-row">
        <button onClick={()=>setTextToCopy(props.link)}>Copy</button>
      </div>
      {textToCopy !== null && <div className="center container-row">
        <p>Link copied to clipboard!</p>
      </div>}
    </div>
  </div>;
};

export default CopyLink;
