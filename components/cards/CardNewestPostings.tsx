import { View, ScrollView } from 'react-native';
import CardPostItem from './CardPostItem';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import { useGetListingCategoriesQuery } from '@/services/listingFilterServices';
import { find, map } from 'lodash';
import FilterStuffType from '../filters/FilterStuffType';
import { useMemo, useState } from 'react';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import { useGetNewestPostsQuery } from '@/services/listingServices';
import ListFlatStyled from '../override/FlatListStyled';

const CardNewestPostings = () => {
  const commonStyles = useCommonStyles();

  const { data: listingCategoriesData, error: listingCategoriesError } =
    useGetListingCategoriesQuery();

  const listingCategoryOptions = useMemo<ISelectOption[]>(() => {
    return map(listingCategoriesData, (l) => {
      return { label: l.name, value: l.id };
    });
  }, [listingCategoriesData]);

  const [newestCategory, setNewestCategory] = useState(
    listingCategoryOptions[0]?.value
  );

  const { data: newestPostData, isLoading: newestPostDataIsLoading } =
    useGetNewestPostsQuery({
      categoryId: newestCategory as string,
    });

  return (
    <View style={{ height: '100%' }}>
      <View
        style={[
          commonStyles.flexStyles.rowBetween,
          {
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          },
        ]}
      >
        <View>
          <TextStyled fontSize="h6" textAlignment="left" fontWeight="semibold">
            Newest Postings in
          </TextStyled>
        </View>

        <View
          style={{
            width: APP_STYLE_VALUES.WH_SIZES.xl6,
            marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          }}
        >
          <FilterStuffType
            variant="badgeOutlined"
            value={find(
              listingCategoryOptions,
              (category) => category.value === newestCategory
            )}
            onChange={(option: ISelectOption) =>
              setNewestCategory(option.value)
            }
            options={listingCategoryOptions}
          />
        </View>
      </View>

      <ListFlatStyled
        isLoading={newestPostDataIsLoading}
        onStartShouldSetResponder={() => true}
        data={newestPostData}
        renderItem={({ item }) => <CardPostItem post={item} />}
      />
    </View>
  );
};

export default CardNewestPostings;
