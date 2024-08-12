import useThemedStyles from '@/hooks/useThemedStyles';
import React from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import { IButtonStylesheet } from '@/interfaces/theme';

interface IProps {
  disabled?: boolean;
  onPress?: () => void;
  text: string;
  variant: keyof IButtonStylesheet;
}

const ButtonStyled: React.FC<IProps> = ({
  disabled,
  onPress,
  text,
  variant,
}) => {
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();

  return (
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
      <TextStyled
        // @todo handle for other scenarios where the color is not white
        customColor={
          variant === 'buttonPrimarySolid' ? 'grayScale100' : 'grayScale900'
        }
        textShadow="textShadowSm"
        fontSize="lg"
        fontWeight="semibold"
      >
        {text}
      </TextStyled>
    </Pressable>
  );
};

export default ButtonStyled;
