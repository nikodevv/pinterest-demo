import React from 'react';
import {FirestoreData} from "../../utility/firebaseFascade";

export const helpers = {
  fetchData: async (userId, setPosts) => {
    const userPosts = await FirestoreData.fetchUserPosts(userId);
    setPosts(userPosts);
  }
};

const UserPage = (props) => {
  const {userId} = props.match.params;
  const [posts, setPosts] = React.useState([]);

  React.useEffect(()=>{
    helpers.fetchData(userId, setPosts);
  }, [userId]);
  return <div>UserPage</div>;
};

export default UserPage;
