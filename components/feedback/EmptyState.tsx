import { useTranslation } from "react-i18next";
import { View } from "react-native";

import SNoDataIllustration from "@/components/svg/illustrations/SNoDataIllustration";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

import { InnerCommonContainer } from "../containers";
import { TextStyled } from "../typography";

const EmptyState = () => {
  const { t } = useTranslation();
  const { commonStyles } = useAppStyles();

  return (
    <InnerCommonContainer>
      <View
        style={[
          commonStyles.flexStyles.colCenter,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp6,
            height: "100%",
          },
        ]}
      >
        <TextStyled fontSize="h4" customColor="primary" fontWeight="bold">
          {t("common.noData")}
        </TextStyled>

        <View
          style={{
            width: APP_STYLE_VALUES.WH_SIZES.xl10,
            height: APP_STYLE_VALUES.WH_SIZES.xl10,
          }}
        >
          <SNoDataIllustration />
        </View>
      </View>
    </InnerCommonContainer>
  );
};

export default EmptyState;
