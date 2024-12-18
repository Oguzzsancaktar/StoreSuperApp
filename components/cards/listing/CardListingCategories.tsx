import { View } from "react-native";

import { map } from "lodash";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import IListingCategory from "@/interfaces/listing/IListingCategory";
import { useGetListingCategoriesQuery } from "@/services/listingFilterServices";

import CardListingCategoryItem from "./CardListingCategoryItem";

interface IProps {
  showDescriptions?: boolean;
  selectedCategory: IListingCategory["id"];
  handleSelectCategory(categoryId: IListingCategory["id"]): void;
}
const CardListingCategories: React.FC<IProps> = ({
  showDescriptions = false,
  handleSelectCategory,
  selectedCategory,
}) => {
  const { commonStyles } = useAppStyles();

  const { data: listingCategoriesData } = useGetListingCategoriesQuery();

  return (
    <View
      style={[
        commonStyles.flexStyles.rowWrap,
        { flex: 1, gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
      ]}
    >
      {map(listingCategoriesData, (item, index) => {
        return (
          <View
            key={index}
            style={{
              flex: 1,
              height: APP_STYLE_VALUES.WH_SIZES.xl8,
              minWidth: APP_STYLE_VALUES.WH_SIZES.xl6,
            }}
          >
            <CardListingCategoryItem
              onPress={handleSelectCategory}
              isSelected={selectedCategory === item.id}
              category={item}
            />
          </View>
        );
      })}
    </View>
  );
};

export default CardListingCategories;
