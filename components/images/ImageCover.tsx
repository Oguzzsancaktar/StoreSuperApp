import { View, Text, Image } from 'react-native';
import advertImage from '../../assets/images/advert-image.jpg';

const ImageCover = () => {
  return (
    <Image source={advertImage} style={{ width: '100%', height: '100%' }} />
  );
};

export default ImageCover;
