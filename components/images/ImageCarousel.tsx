import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Lightbox from 'react-native-lightbox-v2';
import ImageStyled from './ImageStyled';
import { map } from 'lodash';
import { useAppTheme } from '@/contexts/ThemeContext';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';

const { width } = Dimensions.get('window');

interface IProps {
  imageUrls: string[];
}

const ImageCarousel: React.FC<IProps> = ({ imageUrls }) => {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const commonStyles = useCommonStyles();
  const { theme } = useAppTheme();

  const carouselRef = useRef<ICarouselInstance>(null);

  const [parentSizes, setParentSizes] = useState({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setParentSizes({ width, height });
  };

  const handleDotClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ index: index, animated: true });
    }
  };

  return (
    <View
      onLayout={handleLayout}
      style={[commonStyles.flexStyles.colCenter, { flex: 1 }]}
    >
      <Carousel
        loop={true}
        autoPlay={false}
        ref={carouselRef}
        width={parentSizes.width || width}
        height={
          parentSizes.height -
          APP_STYLE_VALUES.WH_SIZES.xxs -
          APP_STYLE_VALUES.SPACE_SIZES.sp1
        }
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        mode="parallax"
        data={imageUrls}
        onScrollEnd={(index) => setCurrentIndex(() => index)}
        renderItem={({ item, ...others }) => {
          return (
            <Lightbox
              onOpen={() => setIsLightBoxOpen(true)}
              willClose={() => setIsLightBoxOpen(false)}
              swipeToDismiss={false}
            >
              <ImageStyled
                resizeMode={isLightBoxOpen ? 'contain' : 'cover'}
                url={item}
              />
            </Lightbox>
          );
        }}
      />

      <View
        style={[
          commonStyles.flexStyles.rowCenterWrap,
          commonStyles.absolutePositionStyles.absoluteFill,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            top: 'auto',
          },
        ]}
      >
        {map(imageUrls, (img, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleDotClick(index)}
              style={{
                backgroundColor:
                  currentIndex === index ? theme.primary : theme.grayScale400,
                width: APP_STYLE_VALUES.WH_SIZES.xxs,
                height: APP_STYLE_VALUES.WH_SIZES.xxs,
                borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ImageCarousel;
