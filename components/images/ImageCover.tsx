import { Image } from 'react-native';
import advertImage from '../../assets/images/advert-image.jpg';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

interface IProps {
  url?: string;
}
const ImageCover: React.FC<IProps> = ({ url }) => {
  let Image_Http_URL = { uri: url };
  return (
    <Image
      source={url ? Image_Http_URL : advertImage}
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
