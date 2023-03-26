import { Typography, useTheme } from "@mui/material";
import FlexDecor from "components/FlexDecor";
import FeaturewRapper from "components/FeaturewRapper";

const AdvertisingFeature = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FeaturewRapper>
      <FlexDecor>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexDecor>
      <img
        width="100%"
        height="auto"
        alt="advertising"
        src="http://localhost:3001/assets/info4.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexDecor>
        <Typography color={main}>Frequency Skin</Typography>
        <Typography color={medium}>Frequencyskin.com</Typography>
      </FlexDecor>
      <Typography color={medium} m="0.5rem 0">
      Vegan. Organic. It's eveything you dreamed of.
      </Typography>
    </FeaturewRapper>
  );
};

export default AdvertisingFeature;


                