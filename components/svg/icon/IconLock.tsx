import { IIconProps } from '@/interfaces/app';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

const IconLock: React.FC<IIconProps> = ({ color }) => {
  return (
    <Svg width="23" height="24" viewBox="0 0 23 24" fill="none">
      <Path
        d="M15.8125 10.5V6.75C15.8125 5.55653 15.3581 4.41193 14.5494 3.56802C13.7406 2.72411 12.6437 2.25 11.5 2.25C10.3563 2.25 9.25935 2.72411 8.4506 3.56802C7.64185 4.41193 7.1875 5.55653 7.1875 6.75V10.5M6.46875 21.75H16.5312C17.1031 21.75 17.6516 21.5129 18.0559 21.091C18.4603 20.669 18.6875 20.0967 18.6875 19.5V12.75C18.6875 12.1533 18.4603 11.581 18.0559 11.159C17.6516 10.7371 17.1031 10.5 16.5312 10.5H6.46875C5.89688 10.5 5.34843 10.7371 4.94405 11.159C4.53968 11.581 4.3125 12.1533 4.3125 12.75V19.5C4.3125 20.0967 4.53968 20.669 4.94405 21.091C5.34843 21.5129 5.89688 21.75 6.46875 21.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconLock;
