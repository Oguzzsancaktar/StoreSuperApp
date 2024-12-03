import { TouchableOpacity } from 'react-native';
import IconChevronLeft from '../svg/icon/IconChevronLeft';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { router } from 'expo-router';
import { useAppTheme } from '@/contexts/ThemeContext';
import ImageIconCircle from '../images/ImageIconCircle';

interface IProps {
  customEvent?: () => void;
}

const ButtonGoBack: React.FC<IProps> = ({ customEvent }) => {
  const { theme } = useAppTheme();

  const handlePress = () => {
    if (customEvent) {
      customEvent();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        {
          width: APP_STYLE_VALUES.WH_SIZES.xs,
          zIndex: 99,
          top: 0,
        },
      ]}
    >
      <ImageIconCircle
        bgColor="transparent"
        icon={<IconChevronLeft color={theme.grayScale900} />}
      />
    </TouchableOpacity>
  );
};

export default ButtonGoBack;
