import { IIconProps } from '@/interfaces/app';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

const IconCheck: React.FC<IIconProps> = ({ color }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.5 12.75L10.5 18.75L19.5 5.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconCheck;
