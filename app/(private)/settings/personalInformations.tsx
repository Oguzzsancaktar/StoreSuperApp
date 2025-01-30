import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import FormPersonalInformation from "@/components/form/FormPersonalInformation";
import ImageIconCircle from "@/components/images/ImageIconCircle";
import IconSettingCog from "@/components/svg/icon/IconSettingCog";
import { TextStyled } from "@/components/typography";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IIconNames } from "@/interfaces/app";

export interface ISettingItemProps {
  icon: IIconNames;
  text: string;
  right: "chevron" | "switch";
  onPress: () => void;
}

const PersonalInformationScreen = () => {
  const { t } = useTranslation();
  const {
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <InnerCommonContainer>
        <View
          style={[
            commonStyles.flexStyles.colStart,
            {
              flex: 1,
              height: "100%",
              width: "100%",
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            },
          ]}
        >
          <View style={[commonStyles.flexStyles.colCenter, { width: "100%" }]}>
            <ImageIconCircle
              size={APP_STYLE_VALUES.WH_SIZES.xl}
              bgColor="primary"
              icon={
                <IconSettingCog
                  color={theme.white}
                  width={APP_STYLE_VALUES.WH_SIZES.sm}
                  height={APP_STYLE_VALUES.WH_SIZES.sm}
                />
              }
            />

            <TextStyled fontSize="h4" fontWeight="bold">
              {t("settings.personalInformation")}
            </TextStyled>
          </View>

          <View
            style={[
              commonStyles.flexStyles.colStart,
              {
                flex: 1,
                width: "100%",
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              },
            ]}
          >
            <FormPersonalInformation />
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default PersonalInformationScreen;
