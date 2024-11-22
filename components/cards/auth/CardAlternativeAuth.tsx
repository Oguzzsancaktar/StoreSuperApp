import { View, Pressable } from 'react-native';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import IconSocialGoogle from '@/components/svg/icon/IconSocialGoogle';
import IconSocialFacebook from '@/components/svg/icon/IconSocialFacebook';
import IconSocialApple from '@/components/svg/icon/IconSocialApple';
import { Link, router } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { useAppTheme } from '@/contexts/ThemeContext';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { TextStyled } from '@/components/typography';
import useCommonStyles from '@/hooks/useCommonStyles';

interface IProps {
  authType: 'LOGIN' | 'REGISTER';
}

const CardAlternativeAuth: React.FC<IProps> = ({ authType }) => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();

  const config = {
    issuer: 'https://yourtenant.b2clogin.com/yourtenant.onmicrosoft.com/v2.0/',
    clientId: 'your-client-id',
    redirectUrl: 'your-redirect-url',
    scopes: ['openid', 'profile', 'email'],
    additionalParameters: {
      prompt: 'login',
    },
  };

  const signIn = async () => {
    try {
      // const result = await authorize(config);
      // console.log('DD App Authorization result:', result);
      // Handle authentication success
    } catch (error) {
      console.error('Authorization error:', error);
      // Handle authentication failure
    }
  };

  return (
    <View style={{ marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp5 }}>
      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          {
            height: 1,
            backgroundColor: theme.grayScale400,
            top: 8,
          },
        ]}
      />
      <View
        style={[
          commonStyles.flexStyles.selfCenter,
          {
            backgroundColor: theme.appBackground,
            width: APP_STYLE_VALUES.WH_SIZES.lg,
          },
        ]}
      >
        <TextStyled
          fontSize="md"
          fontWeight="regular"
          customColor="grayScale400"
        >
          Or
        </TextStyled>
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowCenterWrap,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp5,
            marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp8,
          },
        ]}
      >
        <Pressable onPress={signIn}>
          <ImageIconCircle
            gradientBg={true}
            radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
            borderColor="primary"
            bgColor="appBackground"
            size={APP_STYLE_VALUES.WH_SIZES.lg}
            icon={<IconSocialGoogle />}
          />
        </Pressable>

        {/* <ImageIconCircle
          gradientBg={true}
          radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
          borderColor="primary"
          bgColor="appBackground"
          size={APP_STYLE_VALUES.WH_SIZES.lg}
          icon={<IconSocialFacebook />}
        />

        <ImageIconCircle
          gradientBg={true}
          radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
          borderColor="primary"
          bgColor="appBackground"
          size={APP_STYLE_VALUES.WH_SIZES.lg}
          icon={<IconSocialApple color={theme.grayScale900} />}
        /> */}
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowCenterWrap,
          { gap: APP_STYLE_VALUES.SPACE_SIZES.sp1 },
        ]}
      >
        <TextStyled
          fontSize="md"
          fontWeight="regular"
          customColor="grayScale400"
        >
          {authType === 'REGISTER'
            ? 'Already Have Account?'
            : 'Dont Have Account yet?'}
        </TextStyled>

        <Link
          href={
            APP_ROUTES.PUBLIC[authType === 'REGISTER' ? 'LOGIN' : 'REGISTER']
          }
        >
          <TextStyled customColor="primary" fontSize="md" fontWeight="semibold">
            {authType === 'REGISTER' ? 'Login' : 'Register'}
          </TextStyled>
        </Link>
      </View>
    </View>
  );
};

export default CardAlternativeAuth;
