import React from "react";
import { View } from "react-native";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

import ButtonLogout from "../button/ButtonLogout";
import { InnerCommonContainer } from "../containers";
import ScreenWrapperContainer, {
  IScreenWrapperContainerProps,
} from "../containers/ScreenWrapperContainer";
import SUnautorizedIllustration from "../svg/illustrations/SUnautorizedIllustration";
import { TextStyled } from "../typography";

interface IProps extends IScreenWrapperContainerProps {}
const Unauthorized: React.FC<IProps> = ({
  isTabBarActive,
  showGoBack = true,
}) => {
  const { commonStyles } = useAppStyles();
  return (
    <ScreenWrapperContainer
      showGoBack={showGoBack}
      isTabBarActive={isTabBarActive}
    >
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
          <View style={[commonStyles.flexStyles.colCenter]}>
            <TextStyled fontSize="h4" customColor="primary" fontWeight="bold">
              Already have an account?
            </TextStyled>

            <TextStyled fontSize="h6" fontWeight="regular">
              Sign in into your account to see more.
            </TextStyled>
          </View>

          <View
            style={{
              width: APP_STYLE_VALUES.WH_SIZES.xl10,
              height: APP_STYLE_VALUES.WH_SIZES.xl10,
            }}
          >
            <SUnautorizedIllustration />
          </View>

          <ButtonLogout />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default Unauthorized;
