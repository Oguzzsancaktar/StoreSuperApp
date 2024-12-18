import { View } from "react-native";

import TextStyled from "@/components/typography/TextStyled";
import useAppStyles from "@/hooks/useAppStyles";

const TextScanEffect = () => {
  const { commonStyles } = useAppStyles();

  return (
    <View
      style={[
        commonStyles.flexStyles.selfCenter,
        {
          paddingVertical: 0,
        },
      ]}
    >
      <TextStyled fontSize="xl" fontWeight="regular" customColor="grayScale600">
        DISCOVER
      </TextStyled>
      {/* <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          commonStyles.flexStyles.flexCenter,
        ]}
      >
        <ScanTextPattern />
      </View> */}
    </View>
  );
};

export default TextScanEffect;
