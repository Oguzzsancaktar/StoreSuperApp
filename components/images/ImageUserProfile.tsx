import React from 'react';
import ImageStyled from './ImageStyled';
import ImageIconCircle from './ImageIconCircle';
import IconUser from '../svg/icon/IconUser';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Animated, DimensionValue, View } from 'react-native';

interface IProps {
  url?: string;
  width?: number | DimensionValue;
  height?: number | DimensionValue;
  iconSize?: number;
}
const ImageUserProfile: React.FC<IProps> = ({
  url,
  width = '100%', // APP_STYLE_VALUES.WH_SIZES.xs,
  height = '100%', // APP_STYLE_VALUES.WH_SIZES.xs,
  iconSize = APP_STYLE_VALUES.WH_SIZES.xs2,
}) => {
  const { theme } = useAppTheme();

  console.log('width', width);
  return url ? (
    <View style={{ width, height }}>
      <ImageStyled url={url} />
    </View>
  ) : (
    <ImageIconCircle
      icon={<IconUser width={iconSize} height={iconSize} color={theme.white} />}
      size={width}
    />
  );
};

export default ImageUserProfile;
