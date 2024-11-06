import APP_COMMONS from '@/constants/APP_COMMONS';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { map } from 'lodash';
import { View, Text } from 'react-native';
import CardListingCategoryItem from './CardListingCategoryItem';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useGetListingCategoriesQuery } from '@/services/listingFilterServices';

const CardListingCategories = () => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  const { data: listingCategoriesData } = useGetListingCategoriesQuery();

  return (
    <View style={{ flex: 1, gap: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
      {map(listingCategoriesData, (item, index) => {
        return <CardListingCategoryItem category={item} key={index} />;
      })}
    </View>
  );
};

export default CardListingCategories;
