import { useState } from "react";
import { DeleteOutlined,  MoreHorizOutlined, GifBoxOutlined, EditOutlined, ImageOutlined, MicOutlined, } from "@mui/icons-material";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

import { Box, Typography, Divider, InputBase, useTheme, useMediaQuery, IconButton, Button,  } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import Dropzone from "react-dropzone";
import FlexDecor from "components/FlexDecor";
import UserAvatar from "components/UserAvatar";
import FeaturewRapper from "components/FeaturewRapper";


const MyPostFeature = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage] = useState(false);
    // const [setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

// making an api call
const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3007/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`},
        body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
};

return (
    <FeaturewRapper>
        <FlexDecor gap="1.5rem">
            <UserAvatar image={picturePath} />
            <InputBase 
                placeholder="What's on your mind..."
                onChange={(e) => setPost(e.target.value)}
                value={post}
                sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "1.5rem",
                    padding: "1rem 2rem",
                }}
                />
        </FlexDecor>
         {/* add image to the post  */}
          {isImage && (
            <Box 
            border={`1px solid ${medium}`}
            norderRadius="5px"
            margintop="1rem"
            padding="1rem"
            >
            <Dropzone
                acceptedFiles=".jpg, .jpeg, .png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
                {({ getRootsProps, getInputProps }) => (
                    <FlexDecor>
                    <Box
                    {...getRootsProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    padding="1rem"
                    width="100%"
                    sx={{ "&hover": {cursor: "pointer" } }}
                    >
                    <input {...getInputProps()} />
                    {!image ? (
                       <p>Add an image Here</p>
                    ) : (
                    <FlexDecor>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                        </FlexDecor>
                        )}
                    </Box>
                   
                    {image && (
                        <IconButton
                        onClick={() => setImage(null)}
                        sx={{width: "15%"}}>
                        <DeleteOutlined /> 
                        </IconButton>
                        )}
                    </FlexDecor>
                )}
            </Dropzone>
         </Box>
        )}

        <Divider sx={{ margin: "1.25rem 0"}} />
        <FlexDecor>
            <FlexDecor gap="0.25" onClick={() => setImage(!isImage)}>
                <ImageOutlined sx={{ color: mediumMain }} />
                <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium }}}
                >
                    Image
                </Typography>
            </FlexDecor>
            {isNonMobileScreens ? (
                <>
                <FlexDecor gap="0.25rem">
                    <GifBoxOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Clip</Typography>
                </FlexDecor>
               

                <FlexDecor gap="0.25rem">
                    <AttachFileOutlinedIcon sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Attachment</Typography>
                </FlexDecor>

                <FlexDecor gap="0.25rem">
                    <MicOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Audio</Typography>
                </FlexDecor>
                </>
            ):(
                // no functionality yet
                <FlexDecor gap="0.25">
                    <MoreHorizOutlined sx={{ color: mediumMain}} />
                </FlexDecor>
            )}
            <Button
                disabled={!post}
                onClick={handlePost}
                sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem",
                }}
            >
                POST
            </Button>
        </FlexDecor>
    </FeaturewRapper>
)
}
    
export default MyPostFeature;