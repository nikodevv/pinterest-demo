import React from 'react';
import {firebaseAuth} from "../../utility/firebaseFascade";

const UserPage = (props) => {
  const {userId} = props.match.params;
  const [posts, setPosts] = React.useState([]);

  React.useEffect(()=>{
    const fetchData = async () => {
      const userPosts = await firebaseAuth.fetchUserPosts(userId);
      setPosts(userPosts);
    };

    fetchData();
  }, [userId]);
  console.log(posts);
  return <div>UserPage</div>;
};

export default UserPage;
