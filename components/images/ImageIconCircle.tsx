import { View, Text } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '../typography';
import { IAppTheme } from '@/interfaces/theme';
import { BlurView } from '@react-native-community/blur';

interface IProps {
  icon: JSX.Element;
  bgColor?: keyof IAppTheme;
  size?: number;
}
const ImageIconCircle: React.FC<IProps> = ({
  icon,
  bgColor,
  size = APP_STYLE_VALUES.WH_SIZES.sm,
}) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme, isDark } = useAppTheme();

  return (
    <View
      style={[
        commonStyles.flexStyles.flexCenter,
        bgColor && { backgroundColor: theme[bgColor] },
        {
          width: size,
          height: size,
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
          overflow: 'hidden',
        },
      ]}
    >
      {!bgColor ? (
        <BlurView
          style={[
            commonStyles.flexStyles.colCenter,
            { flex: 1, width: '100%', height: '100%' },
          ]}
          blurType={'dark'}
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
        >
          {icon}
        </BlurView>
      ) : (
        icon
      )}
    </View>
  );
};

export default ImageIconCircle;
