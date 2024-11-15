import { COMMON_COLOURS } from '@/constants/APP_THEMES';
import React, { useRef, useEffect } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

interface IProps {
  size?: number;
  color?: string;
}

const SvgAnimLoadingSpinner: React.FC<IProps> = ({
  size = 45,
  color = COMMON_COLOURS.primary,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Start animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  // Interpolating the rotation
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const segmentCount = 10; // Number of segments in the spinner
  const segmentLength = 5; // Length of each segment
  const segmentWidth = 6; // Width of each segment
  const radius = size / 3 - segmentLength; // Radius of the spinner

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {Array.from({ length: segmentCount }).map((_, i) => {
            const angle = (360 / segmentCount) * i; // Angle for each segment
            const x =
              size / 2 +
              radius * Math.cos((angle * Math.PI) / 180) -
              segmentWidth / 2;
            const y =
              size / 2 +
              radius * Math.sin((angle * Math.PI) / 180) -
              segmentLength / 2;

            return (
              <Rect
                key={i}
                x={x}
                y={y}
                width={segmentWidth}
                height={segmentLength}
                rx={2} // Rounded corners for the segment
                fill={color}
                opacity={i / segmentCount} // Gradually reduce opacity
                transform={`rotate(${angle}, ${x + segmentWidth / 2}, ${
                  y + segmentLength / 2
                })`}
              />
            );
          })}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SvgAnimLoadingSpinner;
