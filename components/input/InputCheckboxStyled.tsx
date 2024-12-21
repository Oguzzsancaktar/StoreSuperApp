import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

import IconCheck from "../svg/icon/IconCheck";
import { TextStyled } from "../typography";

interface IProps {
  label?: string;
  isChecked?: boolean;
  placeholder?: string;
  onToggle(value: boolean): void;
}

const InputCheckboxStyled: React.FC<IProps> = ({
  label,
  placeholder,
  isChecked = false,
  onToggle,
}) => {
  // console.log("labrl", label, isChecked);
  const {
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();

  const animation = useSharedValue(isChecked ? 1 : 0);
  const iconOpacity = useSharedValue(isChecked ? 1 : 0);

  useEffect(() => {
    // Synchronize animations with external value changes
    animation.value = withSpring(isChecked ? 1 : 0, {
      damping: 20,
      stiffness: 150,
    });

    iconOpacity.value = withTiming(isChecked ? 1 : 0, {
      duration: 300,
    });
  }, [isChecked]);

  const handleToggle = () => {
    const newValue = !isChecked;

    animation.value = withSpring(newValue ? 1 : 0, {
      damping: 20,
      stiffness: 150,
    });

    iconOpacity.value = withTiming(newValue ? 1 : 0, {
      duration: 300,
    });

    if (onToggle) {
      onToggle(newValue);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        animation.value === 1 ? theme.primary : theme.transparent,
      borderColor: animation.value === 1 ? theme.primary : theme.grayScale500,
      borderWidth: 2,
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
      transform: [
        {
          scale: iconOpacity.value,
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={handleToggle}
      style={{
        marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp1,
      }}
    >
      <View
        style={[
          commonStyles.flexStyles.rowStart,
          {
            alignItems: "center",
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: APP_STYLE_VALUES.WH_SIZES.xs2,
              height: APP_STYLE_VALUES.WH_SIZES.xs2,
              borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.sm,
            },
            commonStyles.flexStyles.colCenter,
            animatedStyle,
          ]}
        >
          <Animated.View style={iconAnimatedStyle}>
            {isChecked && <IconCheck color={theme.white} />}
          </Animated.View>
        </Animated.View>

        {label && (
          <View
            style={{
              marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            }}
          >
            <TextStyled
              textAlignment="left"
              fontSize="md"
              fontWeight="semibold"
            >
              {label}
            </TextStyled>
          </View>
        )}
      </View>

      {placeholder && (
        <TextStyled textAlignment="left" fontSize="md" fontWeight="regular">
          {placeholder}
        </TextStyled>
      )}
    </Pressable>
  );
};

export default InputCheckboxStyled;
