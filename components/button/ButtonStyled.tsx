import React, { ReactNode } from "react";
import { Pressable, View } from "react-native";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IIconNames } from "@/interfaces/app";
import { IButtonStylesheet } from "@/interfaces/theme";

import SvgAnimLoadingSpinner from "../svg/animation/SvgAnimLoadingSpinner";
import { GradientBackground } from "../svg/background";
import { getIconWithProps } from "../svg/icon";
import { TextStyled } from "../typography";

interface IProps {
  disabled?: boolean;
  onPress?: () => void;
  text?: string;
  gradientBg?: boolean;
  variant: keyof IButtonStylesheet;
  children?: ReactNode;
  isLoading?: boolean;
  leftIcon?: IIconNames;
  rightIcon?: IIconNames;
}

const ButtonStyled: React.FC<IProps> = ({
  disabled,
  gradientBg = false,
  onPress,
  text,
  variant,
  children,
  isLoading,
  leftIcon,
  rightIcon,
}) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  return (
    <View
      style={{
        width: "100%",
        borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
        overflow: "hidden",
      }}
    >
      {gradientBg && <GradientBackground />}

      <Pressable
        onPress={onPress}
        disabled={disabled || isLoading}
        style={({ pressed }) => [
          themedStyles.buttonStyles[
            disabled || isLoading
              ? ((variant + "Disabled") as keyof IButtonStylesheet)
              : pressed
                ? ((variant + "Pressed") as keyof IButtonStylesheet)
                : variant
          ],
          commonStyles.flexStyles.rowCenterWrap,
          { alignContent: "center" },
        ]}
      >
        <View
          style={[
            commonStyles.flexStyles.flexCenter,
            { flex: 1, flexDirection: "row" },
          ]}
        >
          {leftIcon && (
            <View
              style={[
                commonStyles.flexStyles.flexCenter,
                { width: APP_STYLE_VALUES.WH_SIZES.md },
              ]}
            >
              {getIconWithProps(leftIcon, {
                color:
                  theme[variant === "primarySolid" ? "white" : "grayScale900"],
              })}
            </View>
          )}

          {text && (
            <TextStyled
              // @todo handle for other scenarios where the color is not white
              customColor={
                variant === "primarySolid" ? "white" : "grayScale900"
              }
              customStyle={{ width: "auto" }}
              textAlignment="center"
              textShadow="textShadowSm"
              fontSize="lg"
              fontWeight="semibold"
            >
              {text}
            </TextStyled>
          )}

          {children && children}

          {rightIcon && (
            <View
              style={[
                commonStyles.flexStyles.flexCenter,
                { width: APP_STYLE_VALUES.WH_SIZES.md },
              ]}
            >
              {getIconWithProps(rightIcon, {
                color:
                  theme[variant === "primarySolid" ? "white" : "grayScale900"],
              })}
            </View>
          )}

          {isLoading && (
            <View
              style={[
                commonStyles.absolutePositionStyles.absoluteFill,
                commonStyles.flexStyles.flexCenter,
                {
                  left: "auto",
                },
              ]}
            >
              <SvgAnimLoadingSpinner color={theme.white} />
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default ButtonStyled;
