import { useMemo } from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

import { startsWith } from "lodash";

import APP_TYPOGRAPHY from "@/constants/APP_TYPOGRAPHY";
import useAppStyles from "@/hooks/useAppStyles";
import { IAppTheme, IShadowStylesheet } from "@/interfaces/theme";

interface IProps {
  textAlignment?: "left" | "center" | "right";
  textShadow?: keyof IShadowStylesheet;
  fontSize: keyof typeof APP_TYPOGRAPHY.fontSizes;
  fontWeight: keyof typeof APP_TYPOGRAPHY.fontWeights;
  customColor?: keyof IAppTheme;
  children: string | string[] | number;
  numberOfLines?: number;
  textTransform?: TextStyle["textTransform"];
  customStyle?: StyleProp<ViewStyle>;
}

const TextStyled: React.FC<IProps> = ({
  textTransform = "none",
  textAlignment,
  textShadow,
  children,
  fontSize,
  fontWeight,
  customColor,
  numberOfLines,
  customStyle,
}) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme, toggleTheme },
  } = useAppStyles();

  const textStyles = useMemo(() => {
    const { fontSizes, fontWeights } = APP_TYPOGRAPHY;

    let tempStyles: StyleProp<TextStyle> = {
      textTransform: textTransform,
      width: "100%",
      lineHeight: fontSizes[fontSize] * 1.5,
      textAlign: textAlignment || "center",
      fontSize: fontSizes[fontSize],
      fontFamily: fontWeights[fontWeight],
      color: customColor
        ? theme[customColor]
        : startsWith(fontSize, "h")
          ? theme.grayScale900
          : theme.grayScale600,
    };

    if (textShadow) {
      tempStyles = {
        ...tempStyles,
        ...themedStyles.shadowStyles[textShadow],
      };
    }

    return tempStyles;
  }, [
    theme,
    textTransform,
    textAlignment,
    textShadow,
    children,
    fontSize,
    fontWeight,
    customColor,
    numberOfLines,
    customStyle,
  ]);

  return (
    <View
      style={[
        commonStyles.flexStyles.colCenter,
        {
          width: "100%",
        },
        customStyle,
      ]}
    >
      <Text numberOfLines={numberOfLines} style={textStyles}>
        {children}
      </Text>
    </View>
  );
};

export default TextStyled;
