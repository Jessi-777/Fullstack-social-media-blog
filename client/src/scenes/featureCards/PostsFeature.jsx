import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostFeature from "./PostFeature"

const PostsFeature = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    // getting all posts in feed
    const getPosts = async () => {
        const response = await fetch("http://localhost:3007/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };
    // getting a user posts feed
    const getUserPosts = async () => {
        const response = await fetch(
        `http://localhost:3007/posts/${userId}/posts`,  
    {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
    }
  );
  const data = await response.json();
  dispatch(setPosts({ posts: data }));
};

useEffect(() => {
    if (isProfile) {
        getUserPosts();
    } else {
        getPosts();
    }
}, []); // eslint-disable-line react-hooks/exhaustive-deps

return (
    <>
    {posts.map(
        ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
        }) => (
            <PostFeature 
            key={_id}
            postId={_id}
            PosyUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            />
        )
    )}
    </>
)
}

export default PostsFeature;