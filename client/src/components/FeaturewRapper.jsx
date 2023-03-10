import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FeaturewRapper = styled(Box)(({ theme }) => ({
    // top, right , bottom, left
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "1.75rem"
}));

export default FeaturewRapper;