
import NavBar from "scenes/navBar";
import { useMediaQuery, Box } from "@mui/material";
import { useSelector } from "react-redux";
import UserCardLeft from "scenes/featureCards/UserCardLeft";
import MyPostFeature from "scenes/featureCards/MyPostFeature";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar />
      <Box
        width="100"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          {/* setupUserCardLeft */}
          <UserCardLeft userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '43%' : undefined}
          margintop={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostFeature picturePath={ picturePath } />
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
