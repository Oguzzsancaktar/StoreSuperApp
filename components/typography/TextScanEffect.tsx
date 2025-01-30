import { useTranslation } from "react-i18next";
import { View } from "react-native";

import TextStyled from "@/components/typography/TextStyled";
import useAppStyles from "@/hooks/useAppStyles";

const TextScanEffect = () => {
  const { t } = useTranslation();

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
        {t("welcome.titleMain")}
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
