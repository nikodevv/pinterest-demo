import React from 'react';
import _ from 'lodash';
import Columns from "react-columns";
import * as firebase from "firebase";
import { FaTrashAlt, FaLink } from 'react-icons/fa';
import {FirestoreData} from "../../utility/firebaseFascade";
import './UserPage.css'
import {AxiosWrapper} from "../../utility/axiosFascade";
import {useDispatch, useSelector} from "react-redux";
import {modalActionCreators} from "../../actions";

export const helpers = {
  fetchData: async (userId, setPosts) => {
    const userPosts = await FirestoreData.fetchUserPosts(userId);
    setPosts(userPosts);
  },
  handleScroll: (setMaxItems, maxItems)=>{
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setMaxItems(maxItems + 6);
    }
  },
  deleteItem: (userId, itemId) => {
    return FirestoreData.deletePost(userId, itemId)
  },
  shortenLink: async (link) => {
    const response = await AxiosWrapper.shortenLink(link);
    console.log(response.status === 200 ? response.data.shortUrl : "")
    return response.status === 200 ? response.data.shortUrl : "";
  }
};

const UserPage = (props) => {
  const {userId} = props.match.params;
  const ownUserId = !!firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
  const [posts, setPosts] = React.useState([]); // Raw models data
  const [maxItems, setMaxItems] = React.useState(6);
  const [needsToReload, setNeedsToReload] = React.useState(false);
  const loggedIn = useSelector(state=>state.auth.loggedIn);
  const handleScrollListener = _.throttle(() => helpers.handleScroll(setMaxItems, maxItems),250);
  const dispatch = useDispatch();

  // data is fetched if user scrolls to the bottom of page (intentional refresh)
  React.useEffect(()=>{
    helpers.fetchData(userId, setPosts);
  }, [userId, maxItems]);

  // data is re-fetched if needsToReload is true (after an item is deleted)
  React.useEffect(()=>{
    if ( needsToReload===true ) {
      helpers.fetchData(userId, setPosts);
      setNeedsToReload(false)
    }
  }, [needsToReload]);

  React.useEffect(()=>{
    window.addEventListener('scroll', handleScrollListener);
    return () => window.removeEventListener('scroll', handleScrollListener);
  });

  return <div className="container-row center">
    <div className="userPage">
      <Columns>
        {
          posts.slice(0,Math.min(maxItems,posts.length)).map((post, i) => {
            return(<a key={i} href={post.linkUrl} target={'_blank'}>
                {ownUserId === userId && loggedIn===true &&
                <div className="iconContainer">
                  <div className="icon link">
                    <FaLink size={20} onClick={async (e)=>{
                      e.preventDefault();
                      const link = await helpers.shortenLink(post.linkUrl);
                      dispatch(modalActionCreators.toggleShortLinkModal(link));
                    }
                    }/>
                  </div>
                  <div className="icon delete" onClick={async (e)=>{
                    e.preventDefault();
                    await helpers.deleteItem(ownUserId, posts[i].id);
                    setNeedsToReload(true)
                  }}><FaTrashAlt size={20}/></div>
                </div>
                }
              <img alt="user post" src={post.imgUrl}/>
            </a>);
          })
        }
      </Columns>
    </div>
  </div>;
};

export default UserPage;


