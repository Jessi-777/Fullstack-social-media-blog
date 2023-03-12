import { Box, Typography, Divider, useTheme } from "@mui/material";
import {
  EditOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserAvatar from "components/UserAvatar";
import FeaturewRapper from "components/FeaturewRapper";
import FlexDecor from "components/FlexDecor";

const UserCardLeft = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3007/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint disable-line react-hooks-exhauted-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    friends,
    viewedProfile,
    occupation,
    impressions,
  } = user;

  return (
    <FeaturewRapper>
      {/* 1st column in left UserCard */}
      <FlexDecor
        gap="0.5rem"
        bottompadding="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
        >

        <FlexDecor gap="1rem">
          <UserAvatar image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}>
              {firstName}
              {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
          </FlexDecor>
          <ManageAccountsOutlined />
          </FlexDecor>

        <Divider />

        {/* 2nd column in left UserCard */}
        <Box padding="1rem 0">
          <Box
            display="flex"
            alignItems="center"
            gap="1rem"
            marginBottom="0.5rem"
          >
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location} </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined frontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>

        <Divider />

        {/* 3rd column in left UserCard */}
        <Box padding="1rem 0">
          <FlexDecor marginBottom="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexDecor>

          <FlexDecor>
            <Typography color={medium}>insights of your post</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexDecor>
        </Box>
        
        <Divider />

        {/* 4th column in left UserCard */}
        <Box padding="1rem 0">
          <Typography
            fontSize="1rem"
            color={main}
            fontWeight="500"
            marginBottom="1rem">
            Rad Girl Code Profiles
          </Typography>

          <FlexDecor gap="1rem" marginBottom="0.5rem">
            <FlexDecor gap="1rem">
              <img src="../assets/twitter.png" alt="twitter" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}> Social Network</Typography>
              </Box>
            </FlexDecor>
            <EditOutlined sx={{ color: main }} />
          </FlexDecor>

          <FlexDecor gap="1rem">
            <FlexDecor gap="1rem">
              <img src="../assets/linkedin.png" alt="Linkedin" /> 
              <Box>
                <Typography color={main} fontWeight="500">
                  LinkedIn
                </Typography>
                <Typography color={medium}>
                  Network Social Media
                </Typography>
              </Box>
            </FlexDecor>
            <EditOutlined sx={{ color: main }} />
          </FlexDecor>
        </Box>
    </FeaturewRapper>
  );
};

export default UserCardLeft;
