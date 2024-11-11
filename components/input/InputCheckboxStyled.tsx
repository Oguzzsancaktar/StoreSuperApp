import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import IconCheck from '../svg/icon/IconCheck';
import { useAppTheme } from '@/contexts/ThemeContext';

interface IProps {
  label?: string;
  isChecked: boolean;
  onToggle(value: boolean): void;
}
const InputCheckboxStyled: React.FC<IProps> = ({
  label,
  isChecked,
  onToggle,
}) => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();
  const [checked, setChecked] = useState(isChecked);
  const animation = useSharedValue(checked ? 1 : 0);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    animation.value = withSpring(newValue ? 1 : 0, {
      damping: 20,
      stiffness: 150,
    });
    if (onToggle) {
      onToggle(newValue);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        animation.value === 1 ? theme.primary : theme.grayScale300,
      borderColor: animation.value === 1 ? theme.primary : theme.grayScale500,
    };
  });

  return (
    <Pressable
      onPress={handleToggle}
      style={[
        commonStyles.flexStyles.rowStart,
        { marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp1 },
      ]}
    >
      <Animated.View
        style={[
          {
            width: APP_STYLE_VALUES.WH_SIZES.xxs,
            height: APP_STYLE_VALUES.WH_SIZES.xxs,
            borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.sm,
            borderWidth: 2,
          },
          commonStyles.flexStyles.colCenter,
          animatedStyle,
        ]}
      >
        {checked && <IconCheck color={theme.white} />}
      </Animated.View>

      {label && (
        <View
          style={{
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          }}
        >
          <TextStyled textAlignment="left" fontSize="md" fontWeight="regular">
            {label}
          </TextStyled>
        </View>
      )}
    </Pressable>
  );
};

export default InputCheckboxStyled;
