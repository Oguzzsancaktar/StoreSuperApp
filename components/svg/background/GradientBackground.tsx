import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import useCommonStyles from '@/hooks/useCommonStyles';
import { COMMON_COLOURS } from '@/constants/APP_THEMES';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

const GradientBackground = () => {
  const commonStyles = useCommonStyles();
  return (
    <Svg
      height="100%"
      width="100%"
      style={[
        commonStyles.absolutePositionStyles.absoluteFill,
        {
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
          overflow: 'hidden',
          flex: 1,
        },
      ]}
    >
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop
            offset="0"
            stopColor={COMMON_COLOURS.primary}
            stopOpacity="0.2"
          />
          <Stop
            offset="1"
            stopColor={COMMON_COLOURS.transparent}
            stopOpacity="0"
          />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};

export default GradientBackground;
