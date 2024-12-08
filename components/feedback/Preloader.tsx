import React from 'react';
import ScreenWrapperContainer, {
  IScreenWrapperContainerProps,
} from '../containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '../containers';
import { TextStyled } from '../typography';
import ButtonLogout from '../button/ButtonLogout';
import useCommonStyles from '@/hooks/useCommonStyles';
import { View } from 'react-native';
import ImageStyled from '../images/ImageStyled';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import SvgAnimLoadingSpinner from '../svg/animation/SvgAnimLoadingSpinner';

interface IProps extends IScreenWrapperContainerProps {}
const Preloader: React.FC<IProps> = ({ isTabBarActive }) => {
  const commonStyles = useCommonStyles();

  return (
    <ScreenWrapperContainer isTabBarActive={isTabBarActive}>
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
          <SvgAnimLoadingSpinner size={APP_STYLE_VALUES.WH_SIZES.xl4} />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default Preloader;
