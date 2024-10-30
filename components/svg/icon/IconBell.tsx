import { IIconProps } from '@/interfaces/app';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

const IconBell: React.FC<IIconProps> = ({ color }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.857 17.082C16.7202 16.8614 18.5509 16.4217 20.311 15.772C18.8204 14.1208 17.9967 11.9745 18 9.75V9.05V9C18 7.4087 17.3679 5.88258 16.2427 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.8826 3.63214 7.75738 4.75736C6.63216 5.88258 6.00002 7.4087 6.00002 9V9.75C6.00304 11.9746 5.17901 14.121 3.68802 15.772C5.42102 16.412 7.24802 16.857 9.14302 17.082M14.857 17.082C12.959 17.3071 11.041 17.3071 9.14302 17.082M14.857 17.082C15.0011 17.5319 15.037 18.0094 14.9616 18.4757C14.8863 18.942 14.7019 19.384 14.4234 19.7656C14.145 20.1472 13.7803 20.4576 13.3592 20.6716C12.9381 20.8856 12.4724 20.9972 12 20.9972C11.5276 20.9972 11.0619 20.8856 10.6408 20.6716C10.2197 20.4576 9.85509 20.1472 9.57664 19.7656C9.29819 19.384 9.11379 18.942 9.03844 18.4757C8.96309 18.0094 8.99892 17.5319 9.14302 17.082M3.12402 7.5C3.40599 5.82497 4.15782 4.26444 5.29202 3M18.708 3C19.8422 4.26444 20.5941 5.82497 20.876 7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconBell;
