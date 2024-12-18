import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { COMMON_COLOURS } from "@/constants/APP_THEMES";
import useAppStyles from "@/hooks/useAppStyles";

import { TextStyled } from "../typography";

interface IProps {
  label?: string;
  isOn: boolean;
  onToggle: () => void;
}
const InputSwitchStyled: React.FC<IProps> = ({ label, isOn, onToggle }) => {
  const {
    commonStyles,

    themeContext: { theme },
  } = useAppStyles();
  return (
    <View
      style={[
        commonStyles.flexStyles.rowStart,
        {
          alignItems: "center",
        },
      ]}
    >
      {label && (
        <View
          style={{
            marginRight: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          }}
        >
          <TextStyled textAlignment="left" fontSize="md" fontWeight="semibold">
            {label}
          </TextStyled>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.switchContainer,
          { backgroundColor: isOn ? theme.primary : theme.grayScale400 },
        ]}
        onPress={onToggle}
      >
        <View
          style={[
            styles.switchCircle,
            isOn ? styles.onPosition : styles.offPosition,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputSwitchStyled;

const styles = StyleSheet.create({
  switchContainer: {
    width: 52,
    height: 28,
    borderRadius: 20,
    padding: 2,
  },
  switchCircle: {
    width: 24,
    height: 24,
    borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
    backgroundColor: COMMON_COLOURS.white,
  },
  onPosition: {
    alignSelf: "flex-end",
  },
  offPosition: {
    alignSelf: "flex-start",
  },
});
