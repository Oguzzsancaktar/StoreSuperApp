import { DimensionValue, TouchableOpacity } from "react-native";

import { BlurView } from "@react-native-community/blur";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IAppTheme } from "@/interfaces/theme";

import { GradientBackground } from "../svg/background";

interface IProps {
  icon: JSX.Element;
  gradientBg?: boolean;
  borderColor?: keyof IAppTheme;
  bgColor?: keyof IAppTheme;
  size?: number | DimensionValue;
  radius?: number;
  onPress?: () => void;
}
const ImageIconCircle: React.FC<IProps> = ({
  borderColor,
  icon,
  bgColor,
  size = APP_STYLE_VALUES.WH_SIZES.sm,
  radius = APP_STYLE_VALUES.RADIUS_SIZES.full,
  gradientBg,
  onPress,
}) => {
  const {
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[
        commonStyles.flexStyles.flexCenter,
        bgColor && { backgroundColor: theme[bgColor] },
        {
          width: size,
          height: size,
          borderRadius: radius,
          overflow: "hidden",
        },
        borderColor && {
          borderWidth: 1,
          borderColor: theme[borderColor],
        },
      ]}
    >
      {gradientBg && <GradientBackground />}

      {!bgColor ? (
        <BlurView
          style={[
            commonStyles.flexStyles.colCenter,
            { flex: 1, width: "100%", height: "100%" },
          ]}
          blurType={"dark"}
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
        >
          {icon}
        </BlurView>
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

export default ImageIconCircle;
