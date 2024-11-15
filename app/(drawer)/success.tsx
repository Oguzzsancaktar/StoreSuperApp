import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import SRegisterIllustration from '@/components/svg/illustrations/SRegisterIllustration';
import { TextStyled } from '@/components/typography';
import { View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import SvgAnimSuccessCheck from '@/components/svg/animation/SvgAnimSuccessCheck';
import { ButtonStyled } from '@/components/button';
import { Href, router, useLocalSearchParams } from 'expo-router';
import useCommonStyles from '@/hooks/useCommonStyles';
import { WelcomeBackgroundPattern } from '@/components/svg/background';

interface IProps {}

interface ISuccessParamList {
  title: string;
  description: string;
  href: Href;
}

const SuccessScreen: React.FC<IProps> = () => {
  const { title, description, href } = useLocalSearchParams();
  const commonStyles = useCommonStyles();
  return (
    <ScreenWrapperContainer>
      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          commonStyles.flexStyles.flexCenter,
        ]}
      >
        <WelcomeBackgroundPattern />
      </View>

      <InnerCommonContainer>
        <View
          style={[
            commonStyles.flexStyles.colCenter,
            { flex: 1, gap: APP_STYLE_VALUES.SPACE_SIZES.sp5 },
          ]}
        >
          <View
            style={{
              height: APP_STYLE_VALUES.WH_SIZES.xl3,
            }}
          >
            <SvgAnimSuccessCheck />
          </View>

          <View style={{ marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp20 }}>
            <TextStyled
              fontSize="h3"
              fontWeight="medium"
              customColor="grayScale900"
            >
              {title}
            </TextStyled>

            <TextStyled
              fontSize="lg"
              fontWeight="medium"
              customColor="grayScale600"
            >
              {description}
            </TextStyled>
          </View>

          <ButtonStyled
            onPress={() => router.navigate(href as Href)}
            variant="buttonPrimaryOutlined"
            gradientBg={true}
            text="Homepage"
          />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default SuccessScreen;
