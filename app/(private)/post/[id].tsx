import CardPostCategory from '@/components/cards/CardPostCategory';
import CardSellerInfo from '@/components/cards/CardSellerInfo';
import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import ImageCover from '@/components/images/ImageCover';
import IconLocation from '@/components/svg/icon/IconLocation';
import { TextStyled } from '@/components/typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import { View } from 'react-native';

const Signin = () => {
  const commonStyles = useCommonStyles();
  const { theme } = useAppTheme();
  return (
    <ScreenWrapperContainer>
      <InnerCommonContainer>
        <View style={{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp6 }}>
          <View
            style={[
              commonStyles.flexStyles.colStart,
              { width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp4 },
            ]}
          >
            <View>
              <TextStyled fontSize="h3" fontWeight="bold">
                Perfect Land House
              </TextStyled>

              <View
                style={[
                  commonStyles.flexStyles.rowStart,
                  { gap: APP_STYLE_VALUES.SPACE_SIZES.sp1 },
                ]}
              >
                <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xxs }}>
                  <IconLocation color={theme.grayScale400} />
                </View>
                <View style={{ flex: 1 }}>
                  <TextStyled
                    fontSize="md"
                    fontWeight="bold"
                    customColor={'grayScale400'}
                  >
                    Centar Župa Municipality, North Macedonia
                  </TextStyled>
                </View>
              </View>
            </View>

            <View style={{ width: '100%', height: 200 }}>
              <ImageCover />
            </View>

            <View style={{ width: '100%' }}>
              <CardPostCategory />
            </View>

            <View style={{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 }}>
              <TextStyled fontSize="h4" fontWeight="bold" textAlignment="left">
                Description
              </TextStyled>
              <TextStyled
                fontSize="md"
                fontWeight="medium"
                textAlignment="left"
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Debitis, doloremque odit corporis delectus libero sapiente odio!
                Atque facilis cum odio.
              </TextStyled>
            </View>

            <View style={{ width: '100%' }}>
              <CardSellerInfo />
            </View>
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default Signin;
