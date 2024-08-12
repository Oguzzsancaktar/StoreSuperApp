import React from 'react';
import { Button, View } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { WelcomeBackgroundPattern } from '@/components/svg/background';
import useThemedStyles from '@/hooks/useThemedStyles';
import { IconTaratLogoPrimary } from '@/components/svg/icon';
import TextStyled from '@/components/typography/TextStyled';
import { TextScanEffect } from '@/components/typography';
import { ButtonStyled } from '@/components/button';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';

const LoginScreen = () => {
  const { theme } = useAppTheme();
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
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default LoginScreen;
