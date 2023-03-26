import {
    ShareOutlined,
    FavoriteBorderOutlined,
    ChatBubbleOutlineOutlined,
    FavoriteOutlined,
} from "@mui/icons-material";

import { useState } from "react";
import { setPost } from "state";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme, Divider, IconButton } from '@mui/material';
import FlexDecor from "components/FlexDecor";
import Friend from "components/Friend";
import FeaturewRapper from "components/FeaturewRapper";


const PostFeature = ({
    postId,
    postUserId,
    name, description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [ isComments, setIsComments ] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
   
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
 
// add function for production to change number of likes
    const patchLike = async () => {
        const response = await fetch(`http://localhost:3007/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        // recieving updated post from the backend return updated post 
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    return (
        <FeaturewRapper margin="2rem 0">
            <Friend 
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
            />
        <Typography color={main} sx={{ marginTop:"1rem"}}>
            {description}
        </Typography>
        {picturePath && (
            <img 
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3007/assets/${picturePath}`} 
            />
        )}
    <FlexDecor marginTop="0.25">
        <FlexDecor gap="1rem">
            <FlexDecor gap="0.3">
                <IconButton onClick={patchLike}>
                    {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                </IconButton>
                <Typography>{likeCount}</Typography>
            </FlexDecor>

            <FlexDecor gap="0.3">
                <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length}</Typography>
            </FlexDecor>
        </FlexDecor>
        
        <IconButton>
            <ShareOutlined />
        </IconButton>
    </FlexDecor>  
    {/* display comments here  */}
        {isComments && (
            <Box marginTop="0.5rem">
                {comments.map(( comment, i) => (
                    // make this index unique
                    <Box key={`${name}-${i}`}>
                        <Divider />
                        <Typography sx={{ color: main, margin: "0.5rem 0", pl: "1rem"}}>
                        { comment }
                        </Typography>
                    </Box>
                ))}
                <Divider />
            </Box>
        )}
        </FeaturewRapper>
    )
}


export default PostFeature;