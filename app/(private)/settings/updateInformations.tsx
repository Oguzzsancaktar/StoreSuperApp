import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { router } from "expo-router";
import { map } from "lodash";

import CardLinkItem from "@/components/cards/CardLinkItem";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import ImageIconCircle from "@/components/images/ImageIconCircle";
import IconEdit from "@/components/svg/icon/IconEdit";
import { TextStyled } from "@/components/typography";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IIconNames } from "@/interfaces/app";

export interface ISettingItemProps {
  icon: IIconNames;
  text: string;
  right: "chevron" | "switch";
  onPress: () => void;
}

const UpdateInformationScreen = () => {
  const {
    commonStyles,
    themeContext: { theme, toggleTheme },
  } = useAppStyles();
  const { t } = useTranslation();
  const SETTING_ITEMS: ISettingItemProps[] = useMemo(
    () => [
      {
        icon: "IconUser",
        text: "Personal Information",
        right: "chevron",
        onPress: () => {
          router.push(APP_ROUTES.PRIVATE.SETTINGS.PERSONAL_INFO);
        },
      },
      {
        icon: "IconPhone",
        text: "Contact Information",
        right: "chevron",
        onPress: () => {
          router.push(APP_ROUTES.PRIVATE.SETTINGS.CONTACT_INFO);
        },
      },
    ],
    [toggleTheme],
  );

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <InnerCommonContainer>
        <View
          style={[
            commonStyles.flexStyles.colStart,
            { width: "100%", gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
          ]}
        >
          <View style={[commonStyles.flexStyles.colCenter, { width: "100%" }]}>
            <ImageIconCircle
              size={APP_STYLE_VALUES.WH_SIZES.xl}
              bgColor="primary"
              icon={
                <IconEdit
                  color={theme.white}
                  width={APP_STYLE_VALUES.WH_SIZES.sm}
                  height={APP_STYLE_VALUES.WH_SIZES.sm}
                />
              }
            />

            <TextStyled fontSize="h4" fontWeight="bold">
              {t("settings.updateInformation")}
            </TextStyled>
          </View>

          <View
            style={[
              commonStyles.flexStyles.colStart,
              { width: "100%", gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            {map(SETTING_ITEMS, ({ text, icon, right, onPress }, index) => {
              return (
                <CardLinkItem
                  key={index}
                  icon={icon}
                  text={text}
                  right={right}
                  onPress={onPress}
                />
              );
            })}
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default UpdateInformationScreen;
