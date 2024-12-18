import React, { useRef, useState } from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  TouchableOpacity,
  View,
} from "react-native";
import Lightbox from "react-native-lightbox-v2";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { map } from "lodash";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

import ImageStyled from "./ImageStyled";

const { width } = Dimensions.get("window");

interface IProps {
  imageUrls: string[];
}

const ImageCarousel: React.FC<IProps> = ({ imageUrls }) => {
  const {
    commonStyles,

    themeContext: { theme },
  } = useAppStyles();

  const [isLightBoxOpen, setIsLightBoxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        height={parentSizes.height - APP_STYLE_VALUES.SPACE_SIZES.sp1}
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
                resizeMode={isLightBoxOpen ? "contain" : "cover"}
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
            top: "auto",
          },
        ]}
      >
        {map(imageUrls, (img, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotClick(index)}
              style={{
                backgroundColor:
                  currentIndex === index ? theme.primary : theme.grayScale400,
                width: APP_STYLE_VALUES.WH_SIZES.xs4,
                height: APP_STYLE_VALUES.WH_SIZES.xs4,
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
