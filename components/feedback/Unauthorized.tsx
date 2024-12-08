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

interface IProps extends IScreenWrapperContainerProps {}
const Unauthorized: React.FC<IProps> = ({ isTabBarActive }) => {
  const commonStyles = useCommonStyles();
  return (
    <ScreenWrapperContainer showGoBack={true} isTabBarActive={isTabBarActive}>
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
            Authorize Login FOr See Results
          </TextStyled>
          <ImageStyled
            height={APP_STYLE_VALUES.WH_SIZES.xl3}
            imageId="LISTING_ESTATE_DEFAULT"
          />
          <ButtonLogout />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default Unauthorized;
