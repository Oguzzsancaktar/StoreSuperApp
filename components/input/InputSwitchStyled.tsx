import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COMMON_COLOURS } from '@/constants/APP_THEMES';
import { useAppTheme } from '@/contexts/ThemeContext';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

interface IProps {
  isOn: boolean;
  onToggle: () => void;
}
const InputSwitchStyled: React.FC<IProps> = ({ isOn, onToggle }) => {
  const { theme } = useAppTheme();
  return (
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
    alignSelf: 'flex-end',
  },
  offPosition: {
    alignSelf: 'flex-start',
  },
});
