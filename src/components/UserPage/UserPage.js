import React from 'react';
import _ from 'lodash';
import Columns from "react-columns";
import * as firebase from "firebase";
import { FaTrashAlt } from 'react-icons/fa';
import {FirestoreData} from "../../utility/firebaseFascade";
import './UserPage.css'

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
  }
};

const UserPage = (props) => {
  const {userId} = props.match.params;
  const ownUserId = !!firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
  const [posts, setPosts] = React.useState([]); // Raw models data
  const [maxItems, setMaxItems] = React.useState(6);
  const handleScrollListener = _.throttle(() => helpers.handleScroll(setMaxItems, maxItems),250);

  React.useEffect(()=>{
    helpers.fetchData(userId, setPosts);
  }, [userId, maxItems, posts]);

  React.useEffect(()=>{
    window.addEventListener('scroll', handleScrollListener);
    return () => window.removeEventListener('scroll', handleScrollListener);
  });

  return <div className="container-row center">
    <div className="userPage">
      <Columns columns={3}>
        {
          posts.slice(0,Math.min(maxItems,posts.length)).map((post, i) => {
            return(<a key={i} href={post.linkUrl} target={'_blank'}>
                {ownUserId === userId &&
                <div className="deleteIconContainer">
                  <div className="deleteIcon" onClick={async (e)=>{
                    e.preventDefault();
                    await helpers.deleteItem(ownUserId, posts[i].id);
                    setPosts(_.without(posts, i))
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


