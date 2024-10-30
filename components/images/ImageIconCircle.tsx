import { View, Text } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '../typography';
import { IAppTheme } from '@/interfaces/theme';

interface IProps {
  icon: JSX.Element;
  bgColor?: keyof IAppTheme;
  size?: number;
}
const ImageIconCircle: React.FC<IProps> = ({
  icon,
  bgColor = 'grayScale400',
  size = APP_STYLE_VALUES.WH_SIZES.sm,
}) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();
  return (
    <View
      style={[
        commonStyles.flexStyles.flexCenter,
        {
          width: size,
          height: size,
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
          backgroundColor: theme[bgColor],
        },
      ]}
    >
      {icon}
    </View>
  );
};

export default ImageIconCircle;
