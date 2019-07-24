import React from 'react';
import _ from 'lodash';
import Columns from "react-columns";
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
};

const UserPage = (props) => {
  const {userId} = props.match.params;
  const [posts, setPosts] = React.useState([]); // Raw models data
  const [maxItems, setMaxItems] = React.useState(6);
  const handleScrollListener = _.throttle(() => helpers.handleScroll(setMaxItems, maxItems),250);

  React.useEffect(()=>{
    helpers.fetchData(userId, setPosts);
  }, [userId, maxItems]);

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
              <img alt="user post" src={post.imgUrl}/>
            </a>);
          })
        }
      </Columns>
    </div>
  </div>;
};

export default UserPage;


