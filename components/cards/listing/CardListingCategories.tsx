import APP_COMMONS from '@/constants/APP_COMMONS';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { map } from 'lodash';
import { View, Text } from 'react-native';
import CardListingCategoryItem from './CardListingCategoryItem';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useGetListingCategoriesQuery } from '@/services/listingFilterServices';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import { TextStyled } from '@/components/typography';

interface IProps {
  showDescriptions?: boolean;
  selectedCategory: IListingCategory['id'];
  handleSelectCategory(categoryId: IListingCategory['id']): void;
}
const CardListingCategories: React.FC<IProps> = ({
  showDescriptions = false,
  handleSelectCategory,
  selectedCategory,
}) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  const { data: listingCategoriesData } = useGetListingCategoriesQuery();

  return (
    <View
      style={[
        commonStyles.flexStyles.rowWrap,
        { flex: 1, gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
      ]}
    >
      {map(listingCategoriesData, (item, index) => {
        console.log('item', item);
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
