import { DimensionValue, Image, ImageResizeMode, View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useAppImages, { IAppImages } from '@/hooks/useAppImages';

interface IProps {
  url?: string;
  imageId?: IAppImages;
  resizeMode?: ImageResizeMode;
  width?: DimensionValue;
  height?: DimensionValue;
}
const ImageStyled: React.FC<IProps> = ({
  resizeMode = 'cover',
  url,
  imageId = 'LISTING_ESTATE_DEFAULT',
  width = '100%',
  height = '100%',
}) => {
  const APP_IMAGES = useAppImages();
  let Image_Http_URL = { uri: url };

  return (
    <View style={{ width: width, height: height }}>
      <Image
        source={url ? Image_Http_URL : APP_IMAGES[imageId]}
        resizeMode={resizeMode}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.sm,
        }}
      />
    </View>
  );
};

export default ImageStyled;
