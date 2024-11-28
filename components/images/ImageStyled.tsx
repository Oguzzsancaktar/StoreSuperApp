import { Image, ImageResizeMode } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useAppImages, { IAppImages } from '@/hooks/useAppImages';

interface IProps {
  url?: string;
  imageId?: IAppImages;
  resizeMode?: ImageResizeMode;
}
const ImageStyled: React.FC<IProps> = ({
  resizeMode = 'cover',
  url,
  imageId = 'LISTING_ESTATE_DEFAULT',
}) => {
  const APP_IMAGES = useAppImages();
  let Image_Http_URL = { uri: url };

  return (
    <Image
      source={url ? Image_Http_URL : APP_IMAGES[imageId]}
      resizeMode={resizeMode}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.sm,
      }}
    />
  );
};

export default ImageStyled;
