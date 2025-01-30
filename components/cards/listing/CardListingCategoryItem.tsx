import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

import { BlurView } from "@react-native-community/blur";

import { GradientBackground } from "@/components/svg/background";
import { getIconWithProps } from "@/components/svg/icon";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IIconNames } from "@/interfaces/app";
import IListingCategory from "@/interfaces/listing/IListingCategory";

import ImageStyled from "../../images/ImageStyled";
import { TextStyled } from "../../typography";

interface IProps {
  category: IListingCategory;
  onPress(categoryId: IListingCategory["id"]): void;
  isSelected?: boolean;
}
const CardListingCategoryItem: React.FC<IProps> = ({
  onPress,
  category,
  isSelected,
}) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { isDark, theme },
  } = useAppStyles();

  const categoryIconName = useMemo(() => {
    let iconName: IIconNames = "IconHeartFilled";
    switch (category.icon) {
      case "https://stmarketplacedev.blob.core.windows.net/assets/real-estate.svg":
        iconName = "IconRealestate";
        break;
      case "https://stmarketplacedev.blob.core.windows.net/assets/electronics.svg":
        iconName = "IconElectronics";
        break;
      case "https://stmarketplacedev.blob.core.windows.net/assets/cars.svg":
        iconName = "IconCars";
        break;
    }
    return iconName;
  }, [category]);

  return (
    <TouchableOpacity
      onPress={() => onPress(category?.id)}
      style={[
        themedStyles.cardStyles[isSelected ? "primary" : "default"],
        commonStyles.flexStyles.colCenter,
        {
          flex: 1,
          padding: 0,
          paddingVertical: 0,
          margin: 0,
          position: "relative",
        },
      ]}
    >
      <ImageStyled url={category.banner} />

      {isSelected && <GradientBackground />}

      <BlurView
        style={commonStyles.absolutePositionStyles.absoluteFill}
        blurType={isDark ? "dark" : "xlight"}
        blurAmount={2}
        reducedTransparencyFallbackColor="white"
      />

      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          commonStyles.flexStyles.colCenter,
          {
            height: "100%",
            flex: 1,
          },
        ]}
      >
        {getIconWithProps(categoryIconName, {
          color: theme.grayScale700,
          width: APP_STYLE_VALUES.WH_SIZES.md,
          height: APP_STYLE_VALUES.WH_SIZES.md,
        })}
        <TextStyled fontSize="h5" fontWeight="medium">
          {category.name}
        </TextStyled>
      </View>
    </TouchableOpacity>
  );
};

export default CardListingCategoryItem;
