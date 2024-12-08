import React from 'react';
import ImageStyled from './ImageStyled';
import ImageIconCircle from './ImageIconCircle';
import IconUser from '../svg/icon/IconUser';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { View } from 'react-native';

interface IProps {
  url?: string;
  width?: number;
  height?: number;
}
const ImageUserProfile: React.FC<IProps> = ({
  url,
  width = APP_STYLE_VALUES.WH_SIZES.xs,
  height = APP_STYLE_VALUES.WH_SIZES.xs,
}) => {
  const { theme } = useAppTheme();
  return url ? (
    <View style={{ width, height }}>
      <ImageStyled url={url} />
    </View>
  ) : (
    <ImageIconCircle
      icon={
        <IconUser
          width={APP_STYLE_VALUES.WH_SIZES.xs2}
          height={APP_STYLE_VALUES.WH_SIZES.xs2}
          color={theme.white}
        />
      }
      size={APP_STYLE_VALUES.WH_SIZES.sm}
    />
  );
};

export default ImageUserProfile;
