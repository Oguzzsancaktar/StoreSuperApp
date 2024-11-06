import { TextStyled } from '@/components/typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import { View, Text, ScrollView } from 'react-native';
import CardPostItem from '../CardPostItem';
import { useGetListingItemsQuery } from '@/services/listingServices';
import { find, map } from 'lodash';
import { useListingFilter } from '@/contexts/ListingFilterContext';
import FilterSearchbar from '@/components/filters/FilterSearchbar';
import FilterStuffType from '@/components/filters/FilterStuffType';
import CardMostSearchedWords from '../CardMostSearchedWords';
import { useAppTheme } from '@/contexts/ThemeContext';
import { useMemo, useState } from 'react';
import { useGetListingCategoriesQuery } from '@/services/listingFilterServices';
import ISelectOption from '@/interfaces/theme/ISelectOption';

const CardListingItems = () => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();

  const { selectedCategory, setSelectedCategory } = useListingFilter();

  const [showMostSearched, setShowMostSearched] = useState(false);

  const { data: listingCategoriesData } = useGetListingCategoriesQuery();
  const { data: listingItemsData } = useGetListingItemsQuery(
    {
      categoryId: selectedCategory || '',
      pageSize: 100,
      pageNumber: 0,
    },
    { skip: !selectedCategory }
  );

  const listingCategoryOptions = useMemo<ISelectOption[]>(() => {
    return map(listingCategoriesData, (l) => {
      return { label: l.name, value: l.id };
    });
  }, [listingCategoriesData]);

  return (
    <View style={{ height: '100%' }}>
      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          {
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            borderColor: theme.primary,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <FilterSearchbar handleMostSearched={setShowMostSearched} />
        </View>
        <View
          style={{
            width: APP_STYLE_VALUES.WH_SIZES.xl3,
          }}
        >
          <FilterStuffType
            value={find(
              listingCategoryOptions,
              (category) => category.value === selectedCategory
            )}
            onChange={(option: ISelectOption) =>
              setSelectedCategory(option.value)
            }
            options={listingCategoryOptions}
          />
        </View>
      </View>

      {showMostSearched && (
        <View style={{ marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
          <CardMostSearchedWords />
        </View>
      )}

      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          {
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          },
        ]}
      >
        <TextStyled fontSize="h4" fontWeight="bold" customColor="primary">
          {listingItemsData?.totalCount?.toString() || ''}{' '}
        </TextStyled>

        <TextStyled fontSize="h4" fontWeight="bold">
          Results Found
        </TextStyled>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          paddingBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
        }}
      >
        {map(listingItemsData?.items, (post, index) => {
          return <CardPostItem post={post} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default CardListingItems;
