import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { WelcomeBackgroundPattern } from '@/components/svg/background';
import { IconTaratLogoPrimary } from '@/components/svg/icon';
import TextStyled from '@/components/typography/TextStyled';
import { TextScanEffect } from '@/components/typography';
import { ButtonStyled } from '@/components/button';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { router } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';

const WelcomeScreen = () => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();

  const handleSignButtonClick = (type: 'SIGNIN' | 'SIGNUP') => {
    router.push(APP_ROUTES.PUBLIC[type]);
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
            <IconTaratLogoPrimary
              textColor={theme.grayScale800}
              showText={true}
            />
            <View
              style={[
                commonStyles.flexStyles.selfCenter,
                commonStyles.flexStyles.rowCenterWrap,
                commonStyles.maxWidthStyles.maxWidthSm,
              ]}
            >
              <TextStyled
                fontSize="xl"
                fontWeight="regular"
                customColor="grayScale600"
              >
                Hadi sen de
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
                ile aracının kimliğini oluştur!
              </TextStyled>
            </View>
          </View>

          <View style={[commonStyles.spacingStyles.g3]}>
            <ButtonStyled
              onPress={() => handleSignButtonClick('SIGNIN')}
              text={'Giriş Yap'}
              variant="buttonPrimarySolid"
            />

            <ButtonStyled
              onPress={() => handleSignButtonClick('SIGNUP')}
              text="Kayıt Ol"
              variant={'buttonPrimaryOutlined'}
            />
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default WelcomeScreen;
