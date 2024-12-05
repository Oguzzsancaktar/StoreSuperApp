import useThemedStyles from '@/hooks/useThemedStyles';
import { Pressable, View } from 'react-native';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import { IButtonStylesheet } from '@/interfaces/theme';
import React, { ReactNode } from 'react';
import { GradientBackground } from '../svg/background';
import { useAppTheme } from '@/contexts/ThemeContext';
import SvgAnimLoadingSpinner from '../svg/animation/SvgAnimLoadingSpinner';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

interface IProps {
  disabled?: boolean;
  onPress?: () => void;
  text?: string;
  gradientBg?: boolean;
  variant: keyof IButtonStylesheet;
  children?: ReactNode;
  isLoading?: boolean;
}

const ButtonStyled: React.FC<IProps> = ({
  disabled,
  gradientBg = false,
  onPress,
  text,
  variant,
  children,
  isLoading,
}) => {
  const { theme } = useAppTheme();
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();

  return (
    <View
      style={{
        width: '100%',
        borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
        overflow: 'hidden',
      }}
    >
      {gradientBg && <GradientBackground />}

      <Pressable
        onPress={onPress}
        disabled={disabled || isLoading}
        style={({ pressed }) => [
          themedStyles.buttonStyles[
            disabled || isLoading
              ? ((variant + 'Disabled') as keyof IButtonStylesheet)
              : pressed
              ? ((variant + 'Pressed') as keyof IButtonStylesheet)
              : variant
          ],
          commonStyles.flexStyles.rowCenterWrap,
          { alignContent: 'center' },
        ]}
      >
        <View style={[commonStyles.flexStyles.flexCenter, { flex: 1 }]}>
          {text && (
            <TextStyled
              // @todo handle for other scenarios where the color is not white
              customColor={
                variant === 'buttonPrimarySolid' ? 'white' : 'grayScale900'
              }
              textAlignment="center"
              textShadow="textShadowSm"
              fontSize="lg"
              fontWeight="semibold"
            >
              {text}
            </TextStyled>
          )}

          {children && children}

          {isLoading && (
            <View
              style={[
                commonStyles.absolutePositionStyles.absoluteFill,
                commonStyles.flexStyles.flexCenter,
                {
                  left: 'auto',
                },
              ]}
            >
              <SvgAnimLoadingSpinner color={theme.white} />
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default ButtonStyled;
