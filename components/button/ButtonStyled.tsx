import useThemedStyles from '@/hooks/useThemedStyles';
import { Pressable, View } from 'react-native';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import { IButtonStylesheet } from '@/interfaces/theme';
import React, { ReactNode } from 'react';
import { GradientBackground } from '../svg/background';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

interface IProps {
  disabled?: boolean;
  onPress?: () => void;
  text?: string;
  gradientBg?: boolean;
  variant: keyof IButtonStylesheet;
  children?: ReactNode;
}

const ButtonStyled: React.FC<IProps> = ({
  disabled,
  gradientBg = false,
  onPress,
  text,
  variant,
  children,
}) => {
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();

  return (
    <View style={{ width: '100%' }}>
      {gradientBg && <GradientBackground />}

      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          themedStyles.buttonStyles[
            disabled
              ? ((variant + 'Disabled') as keyof IButtonStylesheet)
              : pressed
              ? ((variant + 'Pressed') as keyof IButtonStylesheet)
              : variant
          ],
          commonStyles.flexStyles.flexCenter,
        ]}
      >
        {text && (
          <TextStyled
            // @todo handle for other scenarios where the color is not white
            customColor={
              variant === 'buttonPrimarySolid' ? 'white' : 'grayScale900'
            }
            textShadow="textShadowSm"
            fontSize="lg"
            fontWeight="semibold"
          >
            {text}
          </TextStyled>
        )}

        {children && children}
      </Pressable>
    </View>
  );
};

export default ButtonStyled;
