import { useMemo } from "react";
import { View } from "react-native";

import { router, useNavigation } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { map } from "lodash";

import ButtonLogout from "@/components/button/ButtonLogout";
import CardLinkItem from "@/components/cards/CardLinkItem";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import ImageIconCircle from "@/components/images/ImageIconCircle";
import IconSettingCog from "@/components/svg/icon/IconSettingCog";
import { TextStyled } from "@/components/typography";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import useAppStyles from "@/hooks/useAppStyles";
import { IIconNames } from "@/interfaces/app";

export interface ISettingItemProps {
  icon: IIconNames;
  text: string;
  right: "chevron" | "switch";
  priv?: boolean;
  onPress: () => void;
}

const SettingsScreen = () => {
  const { authToken } = useAppAuthSession();
  const {
    commonStyles,
    themeContext: { theme, toggleTheme },
  } = useAppStyles();

  const SETTING_ITEMS: ISettingItemProps[] = useMemo(
    () => [
      {
        icon: "IconUser",
        text: "Account Settings",
        right: "chevron",
        onPress: () => {
          router.push(APP_ROUTES.PRIVATE.SETTINGS.UPDATE_ACCOUNT);
        },
        priv: true,
      },
      {
        icon: "IconEdit",
        text: "Profile Information",
        right: "chevron",
        onPress: () => {
          router.push(APP_ROUTES.PRIVATE.SETTINGS.UPDATE_INFO);
        },
        priv: true,
      },
      {
        icon: "IconPrivacy",
        text: "Privacy Policy",
        right: "chevron",
        onPress: () => {
          WebBrowser.openBrowserAsync("https://setuka24.com/policy" as string);
          // @todo create policy screen
          // router.push(APP_ROUTES.DRAWER.PRIVACY_POLICY);
        },
      },
      {
        icon: "IconBell",
        text: "Notifications",
        right: "switch",
        onPress: () => {},
      },
      {
        icon: "IconTheme",
        text: "Dark Mode",
        right: "switch",
        onPress: () => {
          toggleTheme();
        },
      },
      {
        icon: "IconChatSupport",
        text: "Contact Us",
        right: "chevron",
        onPress: () => {
          WebBrowser.openBrowserAsync("https://setuka24.com/policy" as string);
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
                <IconSettingCog
                  color={theme.white}
                  width={APP_STYLE_VALUES.WH_SIZES.sm}
                  height={APP_STYLE_VALUES.WH_SIZES.sm}
                />
              }
            />

            <TextStyled fontSize="h4" fontWeight="bold">
              Settings
            </TextStyled>
          </View>

          <View
            style={[
              commonStyles.flexStyles.colStart,
              { width: "100%", gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            {map(
              SETTING_ITEMS,
              ({ text, icon, right, onPress, priv }, index) => {
                if (priv && !authToken) {
                  return null;
                }

                return (
                  <CardLinkItem
                    key={index}
                    icon={icon}
                    text={text}
                    right={right}
                    onPress={onPress}
                  />
                );
              },
            )}
          </View>
        </View>
        <View>
          <ButtonLogout />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default SettingsScreen;
