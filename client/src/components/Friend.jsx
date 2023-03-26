import FlexDecor from './FlexDecor';
import UserAvatar from './UserAvatar';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends } from 'state';



const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector(( state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector(( state ) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    // check if friend is a friend, friend icon add or remove friend api 
    const isFriend = friends.find((friend) => friend._id === friendId); 
    // make function to add api if user is friends
    const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:3007/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <FlexDecor>
            <FlexDecor gap="1rem">
            <UserAvatar image={userPicturePath} size="55px" />
            <Box
            onClick={() => {
                navigate(`/profile/${friendId}`);
            // bug when you go to a users page and then try to click on someone elses page url updates i\with react router
            // but the compnonents do no rerender
            // it will go to the nex users page and then we will refresh the page. Fix for production.
                navigate(0);
            }}
            >
            <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
                "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                },
            }}
            >
            {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
            {subtitle}
            </Typography>
            </Box>
            </FlexDecor>
            <IconButton
            onClick={() => patchFriend()}
            sx={{ background: primaryLight, Padding: "0.6rem"}}
            >
                {/* // if user is a friend or not switch icons  */}
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>
        </FlexDecor>
    )
}

 export default Friend; 