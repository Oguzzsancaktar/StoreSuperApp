import { View, Text } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '../typography';

interface IProps {
  icon: JSX.Element;
}
const ImageIconCircle: React.FC<IProps> = ({ icon }) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();
  return (
    <View
      style={[
        commonStyles.flexStyles.flexCenter,
        {
          width: APP_STYLE_VALUES.WH_SIZES.sm,
          height: APP_STYLE_VALUES.WH_SIZES.sm,
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
          backgroundColor: theme.grayScale400,
        },
      ]}
    >
      {icon}
    </View>
  );
};

export default ImageIconCircle;
