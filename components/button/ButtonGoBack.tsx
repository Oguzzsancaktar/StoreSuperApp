import useThemedStyles from '@/hooks/useThemedStyles';
import { Pressable, TouchableOpacity, View } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';
import { IButtonStylesheet } from '@/interfaces/theme';
import IconChevronLeft from '../svg/icon/IconChevronLeft';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { router } from 'expo-router';
import { useAppTheme } from '@/contexts/ThemeContext';
import ImageIconCircle from '../images/ImageIconCircle';

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
    <TouchableOpacity
      onPress={handlePress}
      style={[
        {
          zIndex: 99,
          top: 0,
          left: APP_STYLE_VALUES.SPACE_SIZES.sp5,
        },
      ]}
    >
      <ImageIconCircle icon={<IconChevronLeft color={theme.white} />} />
    </TouchableOpacity>
  );
};

export default ButtonGoBack;
