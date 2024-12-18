import React from "react";
import { View } from "react-native";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

import { InnerCommonContainer } from "../containers";
import ScreenWrapperContainer, {
  IScreenWrapperContainerProps,
} from "../containers/ScreenWrapperContainer";
import SvgAnimLoadingSpinner from "../svg/animation/SvgAnimLoadingSpinner";

interface IProps extends IScreenWrapperContainerProps {}
const Preloader: React.FC<IProps> = ({ isTabBarActive }) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  return (
    <ScreenWrapperContainer isTabBarActive={isTabBarActive}>
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
          <SvgAnimLoadingSpinner size={APP_STYLE_VALUES.WH_SIZES.xl8} />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default Preloader;
