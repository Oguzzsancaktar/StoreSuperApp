import useThemedStyles from '@/hooks/useThemedStyles';
import React from 'react';
import { Pressable } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';
import { IButtonStylesheet } from '@/interfaces/theme';
import IconChevronLeft from '../svg/icon/IconChevronLeft';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { router } from 'expo-router';
import { useAppTheme } from '@/contexts/ThemeContext';

interface IProps {
  variant: keyof IButtonStylesheet;
}

const ButtonGoBack: React.FC<IProps> = ({ variant }) => {
  const { theme } = useAppTheme();
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();

  const handlePress = () => {
    router.back();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        themedStyles.buttonStyles[
          pressed ? ((variant + 'Pressed') as keyof IButtonStylesheet) : variant
        ],
        commonStyles.flexStyles.flexCenter,
        {
          padding: 0,
          zIndex: 99,
          left: APP_STYLE_VALUES.SPACE_SIZES.sp5,
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
          width: APP_STYLE_VALUES.WH_SIZES.xs,
          height: APP_STYLE_VALUES.WH_SIZES.xs,
        },
      ]}
    >
      <IconChevronLeft color={theme.grayScale500} />
    </Pressable>
  );
};

export default ButtonGoBack;
