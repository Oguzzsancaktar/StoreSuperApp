import { IIconProps } from '@/interfaces/app';
import { Path, Svg } from 'react-native-svg';

const IconBookmark: React.FC<IIconProps> = ({ color }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.593 3.32206C18.693 3.45006 19.5 4.39906 19.5 5.50706V21.0001L12 17.2501L4.5 21.0001V5.50706C4.5 4.39906 5.306 3.45006 6.407 3.32206C10.1232 2.89069 13.8768 2.89069 17.593 3.32206Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconBookmark;
