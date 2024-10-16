import { View, Text } from 'react-native';
import React from 'react';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

const WelcomeBackgroundPattern = () => {
  return (
    <Svg width="430" height="699" viewBox="0 0 430 699" fill="none">
      <Path
        d="M36.5 0V189C36.5 198.389 28.8888 206 19.5 206H-32.5"
        stroke="url(#paint0_linear_16_355)"
      />
      <Path
        d="M75 33V419C75 428.389 67.3888 436 58 436H-60"
        stroke="url(#paint1_linear_16_355)"
      />
      <Path
        d="M120 174V681C120 690.389 112.389 698 103 698H-55"
        stroke="url(#paint2_linear_16_355)"
      />
      <Path
        d="M393.5 0V189C393.5 198.389 401.111 206 410.5 206H462.5"
        stroke="url(#paint3_linear_16_355)"
      />
      <Path
        d="M355 33V419C355 428.389 362.611 436 372 436H490"
        stroke="url(#paint4_linear_16_355)"
      />
      <Path
        d="M310 174V681C310 690.389 317.611 698 327 698H485"
        stroke="url(#paint5_linear_16_355)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_16_355"
          x1="2"
          y1="0"
          x2="2"
          y2="206"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFB800" stopOpacity="0.01" />
          <Stop offset="1" stopColor="#ec572c" stopOpacity="0.6" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_16_355"
          x1="7.5"
          y1="33"
          x2="7.5"
          y2="436"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFB800" stopOpacity="0.01" />
          <Stop offset="1" stopColor="#ec572c" stopOpacity="0.6" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_16_355"
          x1="32.5"
          y1="174"
          x2="32.5"
          y2="698"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFB800" stopOpacity="0.01" />
          <Stop offset="1" stopColor="#ec572c" stopOpacity="0.6" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_16_355"
          x1="428"
          y1="0"
          x2="428"
          y2="206"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFB800" stopOpacity="0.01" />
          <Stop offset="1" stopColor="#ec572c" stopOpacity="0.6" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_16_355"
          x1="422.5"
          y1="33"
          x2="422.5"
          y2="436"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFB800" stopOpacity="0.01" />
          <Stop offset="1" stopColor="#ec572c" stopOpacity="0.6" />
        </LinearGradient>
        <LinearGradient
          id="paint5_linear_16_355"
          x1="397.5"
          y1="174"
          x2="397.5"
          y2="698"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFB800" stopOpacity="0.01" />
          <Stop offset="1" stopColor="#ec572c" stopOpacity="0.6" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default WelcomeBackgroundPattern;
