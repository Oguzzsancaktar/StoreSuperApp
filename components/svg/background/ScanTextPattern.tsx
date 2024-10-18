import { Defs, LinearGradient, Path, Rect, Stop, Svg } from 'react-native-svg';

const ScanTextPattern = () => {
  return (
    <Svg width="95" height="24" viewBox="0 0 95 24" fill="none">
      <Rect
        x="4"
        y="4"
        width="95"
        height="9"
        fill="url(#paint0_linear_16_393)"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M62.5 14H3.5V13H62.5V14Z"
        fill="#616161"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_16_393"
          x1="32.5"
          y1="4"
          x2="32.5"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D9D9D9" stopOpacity="0" />
          <Stop offset="1" stopColor="#D3D3D3" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default ScanTextPattern;
