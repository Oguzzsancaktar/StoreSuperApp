import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useAppTheme } from '@/contexts/ThemeContext';

const AnimatedCircleBorder = Animated.createAnimatedComponent(Circle);
const AnimatedCircleCenter = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const CircleDrawing = () => {
  const { theme } = useAppTheme();
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);
  const checkProgress = useSharedValue(0); // Check icon için animasyon progress'i
  const fillProgress = useSharedValue(0); // Check dolum animasyonu için

  // Animasyon başlangıcı
  useEffect(() => {
    // Çizim animasyonu
    progress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    });

    // Dönüş animasyonu
    rotation.value = withTiming(360, {
      duration: 2000,
      easing: Easing.linear,
    });

    // Check ikonunun çizim animasyonu
    checkProgress.value = withDelay(
      500, // 500ms gecikme
      withTiming(1, {
        duration: 1500, // Çizim süresi
        easing: Easing.inOut(Easing.ease),
      })
    );

    // Dolum animasyonu
    fillProgress.value = withDelay(
      2000, // Check animasyonu tamamlandıktan sonra
      withTiming(1, {
        duration: 1000, // Dolum süresi
        easing: Easing.inOut(Easing.ease),
      })
    );
  }, []);

  // Çizim animasyonu için animated props
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 2 * Math.PI * 50 * (1 - progress.value),
  }));

  // Dönüş animasyonu için animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animatedCircleCenterProps = useAnimatedProps(() => ({
    r: 40 * progress.value,
  }));

  const animatedCheckProps = useAnimatedProps(() => ({
    strokeDashoffset: 260 - 260 * checkProgress.value, // Yeni check ikonunun toplam uzunluğu
  }));

  // Fill animasyonu için stil
  const fillStyle = useAnimatedStyle(() => ({
    opacity: fillProgress.value, // Dolum animasyonu
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.svgWrapper, animatedStyle]}>
        <Svg height="135" width="135" viewBox="0 0 120 120">
          {/* Çizilen daire */}
          <AnimatedCircleBorder
            cx="60"
            cy="60"
            r="50"
            stroke={theme.primary}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 50}
            animatedProps={animatedProps}
          />
          {/* Merkezde genişleyen daire */}
          <AnimatedCircleCenter
            cx="60"
            cy="60"
            r="0"
            fill={theme.primary}
            animatedProps={animatedCircleCenterProps}
          />
        </Svg>
      </Animated.View>

      {/* Yeni Check Icon */}
      <Svg
        width="63"
        height="57"
        viewBox="0 0 63 57"
        fill="none"
        style={styles.checkIcon}
      >
        <AnimatedPath
          d="M58.8227 2.11681C61.0898 3.53135 61.781 6.51596 60.3665 8.78312L27.535 53.9737C26.5678 55.305 24.659 55.502 23.4403 54.3964L3.46996 36.2784C1.49083 34.4828 1.34201 31.4228 3.13757 29.4437C4.93312 27.4646 7.9931 27.3158 9.97223 29.1113L21.4017 39.4807C22.6064 40.5736 24.4896 40.3956 25.4681 39.0963L52.1564 3.66062C53.5709 1.39345 56.5555 0.702269 58.8227 2.11681Z"
          stroke={theme.white}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={260} // Çizginin toplam uzunluğu
          animatedProps={animatedCheckProps}
        />
        {/* Dolum animasyonu */}
        <AnimatedPath
          d="M58.8227 2.11681C61.0898 3.53135 61.781 6.51596 60.3665 8.78312L27.535 53.9737C26.5678 55.305 24.659 55.502 23.4403 54.3964L3.46996 36.2784C1.49083 34.4828 1.34201 31.4228 3.13757 29.4437C4.93312 27.4646 7.9931 27.3158 9.97223 29.1113L21.4017 39.4807C22.6064 40.5736 24.4896 40.3956 25.4681 39.0963L52.1564 3.66062C53.5709 1.39345 56.5555 0.702269 58.8227 2.11681Z"
          fill={theme.white}
          style={fillStyle} // Dolum stilini uygula
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgWrapper: {
    width: 135,
    height: 135,
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -31.5 }, { translateY: -28.5 }], // Yeni ikonun merkezini hizalamak için
  },
});

export default CircleDrawing;
