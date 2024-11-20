import { IIconProps } from '@/interfaces/app';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

const IconTag: React.FC<IIconProps> = ({ color = 'red' }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.568 3H5.25C4.65326 3 4.08097 3.23705 3.65901 3.65901C3.23705 4.08097 3 4.65326 3 5.25V9.568C3 10.165 3.237 10.738 3.659 11.159L13.24 20.74C13.939 21.439 15.02 21.612 15.847 21.07C17.9286 19.7066 19.7066 17.9286 21.07 15.847C21.612 15.02 21.439 13.939 20.74 13.24L11.16 3.66C10.951 3.45077 10.7029 3.28478 10.4297 3.17154C10.1565 3.05829 9.86371 3 9.568 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6H6.008V6.008H6V6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconTag;
