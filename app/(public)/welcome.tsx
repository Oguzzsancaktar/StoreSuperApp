import { TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { WelcomeBackgroundPattern } from '@/components/svg/background';
import TextStyled from '@/components/typography/TextStyled';
import { TextScanEffect } from '@/components/typography';
import { ButtonStyled } from '@/components/button';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { Href, Link, Redirect, router } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { getIconWithProps } from '@/components/svg/icon';
import { useSession } from '@/contexts/AuthContext';
import { toastError } from '@/utils/toastUtils';

const WelcomeScreen = () => {
  const commonStyles = useCommonStyles();
  const { theme, toggleTheme } = useAppTheme();

  const handleSignButtonClick = (type: 'REGISTER' | 'LOGIN') => {
    router.push(APP_ROUTES.PUBLIC[type] as Href<string | object>);
  };

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
            commonStyles.maxWidthStyles.maxWidthXl,
            commonStyles.flexStyles.selfCenter,
            commonStyles.flexStyles.colBetween,
            { flex: 1, width: '100%' },
          ]}
        >
          <View
            style={[
              commonStyles.flexStyles.flexCenter,
              commonStyles.spacingStyles.g7,
            ]}
          >
            <View
              style={[
                commonStyles.flexStyles.selfCenter,
                commonStyles.flexStyles.rowCenterWrap,
                commonStyles.maxWidthStyles.maxWidthSm,
              ]}
            >
              {getIconWithProps('IconLogoPrimary', { color: theme.primary })}

              <TextStyled
                fontSize="xl"
                fontWeight="regular"
                customColor="grayScale600"
              >
                Sell What You Have,
              </TextStyled>
              <View
                style={[commonStyles.spacingStyles.m1, { marginBottom: 0 }]}
              >
                <TextScanEffect />
              </View>
              <TextStyled
                fontSize="xl"
                fontWeight="regular"
                customColor="grayScale600"
              >
                What You Need
              </TextStyled>
            </View>
          </View>

          <View style={[commonStyles.spacingStyles.g3]}>
            <ButtonStyled
              onPress={() => {
                handleSignButtonClick('LOGIN');
              }}
              text={'Login'}
              variant="buttonPrimarySolid"
            />

            <ButtonStyled
              gradientBg={true}
              onPress={() => handleSignButtonClick('REGISTER')}
              text="Register"
              variant={'buttonPrimaryOutlined'}
            />

            <TextStyled fontSize="xl" fontWeight="regular">
              or
            </TextStyled>

            <Link
              style={[commonStyles.flexStyles.selfCenter]}
              href={APP_ROUTES.TABS.TIMELINE}
            >
              <TextStyled
                fontSize="xl"
                fontWeight="regular"
                customColor="grayScale600"
                textAlignment="center"
              >
                Continue without signin
              </TextStyled>
            </Link>
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default WelcomeScreen;
