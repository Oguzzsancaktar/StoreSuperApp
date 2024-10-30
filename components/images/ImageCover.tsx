import { View, Text, Image } from 'react-native';
import advertImage from '../../assets/images/advert-image.jpg';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

const ImageCover = () => {
  return (
    <Image
      source={advertImage}
      resizeMode="cover"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.sm,
      }}
    />
  );
};

export default ImageCover;
