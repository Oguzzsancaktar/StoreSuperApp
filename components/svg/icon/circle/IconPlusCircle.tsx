import { IIconProps } from '@/interfaces/app';
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg';

const IconPlusCircle: React.FC<IIconProps> = ({ color }) => {
  return (
    <Svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <G clipPath="url(#clip0_2509_487)">
        <Path
          d="M27 21.9376L27 32.0626M32.0625 27.0001L21.9375 27.0001M37.1251 37.1252C35.7954 38.4548 34.2169 39.5095 32.4796 40.2291C30.7424 40.9487 28.8804 41.3191 27 41.3191C25.1196 41.3191 23.2576 40.9487 21.5204 40.2291C19.7831 39.5095 18.2046 38.4548 16.8749 37.1252C15.5453 35.7955 14.4906 34.217 13.771 32.4797C13.0514 30.7425 12.681 28.8805 12.681 27.0001C12.681 25.1197 13.0514 23.2577 13.771 21.5205C14.4906 19.7832 15.5453 18.2047 16.8749 16.8751C19.5603 14.1897 23.2024 12.6811 27 12.6811C30.7976 12.6811 34.4397 14.1897 37.1251 16.8751C39.8104 19.5604 41.319 23.2025 41.319 27.0001C41.319 30.7977 39.8104 34.4398 37.1251 37.1252Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2509_487">
          <Rect
            width="38.184"
            height="38.184"
            fill={color}
            transform="translate(27) rotate(45)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default IconPlusCircle;
