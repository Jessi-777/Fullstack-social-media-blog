import { Box } from "@mui/material";

const UserAvatar = ({ image, size ="60px"}) => {
    return (
        <Box width={size} height={size}>
            <img 
            style={{ objectCardSpace:"cover", borderRadius: "50%"}}
            alt="user"
            width={size}
            height={size}
            src={`http://localhost:30007/assets/${image}`}
            />
        </Box>
    )
};
export default UserAvatar;