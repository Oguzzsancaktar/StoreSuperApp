import { IIconProps } from '@/interfaces/app';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

const IconClose: React.FC<IIconProps> = ({ color }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 18L18 6M6 6L18 18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconClose;
