import React from 'react';
import ScreenWrapperContainer, {
  IScreenWrapperContainerProps,
} from '../containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '../containers';
import { TextStyled } from '../typography';
import ButtonLogout from '../button/ButtonLogout';
import useCommonStyles from '@/hooks/useCommonStyles';
import { View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import SUnautorizedIllustration from '../svg/illustrations/SUnautorizedIllustration';

interface IProps extends IScreenWrapperContainerProps {}
const Unauthorized: React.FC<IProps> = ({
  isTabBarActive,
  showGoBack = true,
}) => {
  const commonStyles = useCommonStyles();
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
              height: '100%',
            },
          ]}
        >
          <TextStyled fontSize="h3" customColor="primary" fontWeight="bold">
            Login For More.
          </TextStyled>

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
