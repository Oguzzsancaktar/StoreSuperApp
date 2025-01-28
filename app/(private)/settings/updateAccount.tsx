import { useMemo } from "react";
import { View } from "react-native";

import { router } from "expo-router";
import { map } from "lodash";

import CardLinkItem from "@/components/cards/CardLinkItem";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import ImageIconCircle from "@/components/images/ImageIconCircle";
import IconUser from "@/components/svg/icon/IconUser";
import { TextStyled } from "@/components/typography";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { useModalState } from "@/contexts/ModalContext";
import useAppStyles from "@/hooks/useAppStyles";
import { IIconNames } from "@/interfaces/app";

export interface ISettingItemProps {
  icon: IIconNames;
  text: string;
  right: "chevron" | "switch";
  onPress: () => void;
}

const UpdateAccountScreen = () => {
  const {
    commonStyles,
    themeContext: { theme, toggleTheme },
  } = useAppStyles();

  const { setModalContent } = useModalState();

  const { userTokenInfo } = useAppAuthSession();

  const SETTING_ITEMS: ISettingItemProps[] = useMemo(() => {
    const items = [
      {
        icon: "IconTrash",
        text: "Delete Account",
        right: "chevron",
        onPress: () => {
          setModalContent(() => "ModalDeleteAccount");
        },
      } as ISettingItemProps,
    ];

    if (userTokenInfo?.RegistrationType === "Mail") {
      items.push({
        icon: "IconKey",
        text: "Change Password",
        right: "chevron",
        onPress: () => {
          router.push(APP_ROUTES.PRIVATE.SETTINGS.UPDATE_PASSWORD);
        },
      });
    }

    return items;
  }, [userTokenInfo]);

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
                <IconUser
                  color={theme.white}
                  width={APP_STYLE_VALUES.WH_SIZES.sm}
                  height={APP_STYLE_VALUES.WH_SIZES.sm}
                />
              }
            />

            <TextStyled fontSize="h4" fontWeight="bold">
              Update Account
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

export default UpdateAccountScreen;
