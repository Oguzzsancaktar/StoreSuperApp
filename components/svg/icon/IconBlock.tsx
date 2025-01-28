import React from "react";
import { Path, Svg } from "react-native-svg";

import { IIconProps } from "@/interfaces/app";

const IconBlock: React.FC<IIconProps> = ({
  width = "24",
  height = "24",
  color = "red",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.3641 18.3641C20.0519 16.6762 21.0001 14.387 21.0001 12.0001C21.0001 9.61309 20.0519 7.32389 18.3641 5.63606C16.6762 3.94822 14.387 3 12.0001 3C9.61309 3 7.32389 3.94822 5.63606 5.63606M18.3641 18.3641C16.6762 20.0519 14.387 21.0001 12.0001 21.0001C9.61309 21.0001 7.32389 20.0519 5.63606 18.3641C3.94822 16.6762 3 14.387 3 12.0001C3 9.61309 3.94822 7.32389 5.63606 5.63606M18.3641 18.3641L5.63606 5.63606"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconBlock;
