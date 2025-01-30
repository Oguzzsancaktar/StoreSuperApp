import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import Preloader from "@/components/feedback/Preloader";
import ImageIconCircle from "@/components/images/ImageIconCircle";
import FlatListStyled from "@/components/override/FlatListStyled";
import IconBlock from "@/components/svg/icon/IconBlock";
import { TextStyled } from "@/components/typography";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IIconNames } from "@/interfaces/app";
import {
  useGetBlockedUsersQuery,
  useUnblockUserMutation,
} from "@/services/accountServices";

export interface ISettingItemProps {
  icon: IIconNames;
  text: string;
  right: "chevron" | "switch";
  onPress: () => void;
}

const BlockedUsersScreen = () => {
  const {
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();
  const { t } = useTranslation();
  const { data: blockedUsersData, isLoading: blockedUsersIsLoading } =
    useGetBlockedUsersQuery();
  const [unblockUser] = useUnblockUserMutation();

  if (blockedUsersIsLoading) {
    return <Preloader />;
  }

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <InnerCommonContainer>
        <View
          style={[
            commonStyles.flexStyles.colStart,
            {
              width: "100%",
              height: "100%",
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            },
          ]}
        >
          <View style={[commonStyles.flexStyles.colCenter, { width: "100%" }]}>
            <ImageIconCircle
              size={APP_STYLE_VALUES.WH_SIZES.xl}
              bgColor="primary"
              icon={
                <IconBlock
                  color={theme.white}
                  width={APP_STYLE_VALUES.WH_SIZES.sm}
                  height={APP_STYLE_VALUES.WH_SIZES.sm}
                />
              }
            />

            <TextStyled fontSize="h4" fontWeight="bold">
              {t("settings.blockedUsers")}
            </TextStyled>
          </View>

          <View
            style={[
              commonStyles.flexStyles.colStart,
              { flex: 1, width: "100%", gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            <FlatListStyled
              onStartShouldSetResponder={() => true}
              data={blockedUsersData}
              renderItem={({ item }) => (
                <TextStyled fontWeight="bold" fontSize="h6">
                  {item as any}
                </TextStyled>
              )}
            />
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default BlockedUsersScreen;
