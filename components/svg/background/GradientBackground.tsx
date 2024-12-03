import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import useCommonStyles from '@/hooks/useCommonStyles';
import { COMMON_COLOURS } from '@/constants/APP_THEMES';

interface IProps {
  startColor?: string;
  endColor?: string;
  startOpacity?: string;
  endOpacity?: string;
}
const GradientBackground: React.FC<IProps> = ({
  startColor = COMMON_COLOURS.primary,
  endColor = COMMON_COLOURS.transparent,
  startOpacity = '0.2',
  endOpacity = '0',
}) => {
  const commonStyles = useCommonStyles();
  return (
    <Svg
      height="100%"
      width="100%"
      style={[
        commonStyles.absolutePositionStyles.absoluteFill,
        {
          overflow: 'hidden',
          flex: 1,
        },
      ]}
    >
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={startColor} stopOpacity={startOpacity} />
          <Stop offset="1" stopColor={endColor} stopOpacity={endOpacity} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};

export default GradientBackground;
