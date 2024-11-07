import { View, Text, ScrollView } from 'react-native';
import CardPostItem from './CardPostItem';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import {
  useGetListingCategoriesQuery,
  useGetNewestPostsQuery,
} from '@/services/listingFilterServices';
import { find, map } from 'lodash';
import FilterStuffType from '../filters/FilterStuffType';
import { useMemo, useState } from 'react';
import ISelectOption from '@/interfaces/theme/ISelectOption';

const CardNewestPostings = () => {
  const commonStyles = useCommonStyles();

  const { data: listingCategoriesData } = useGetListingCategoriesQuery();

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
      categoryId: newestCategory,
    });

  return (
    <View style={{ height: '100%' }}>
      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          {
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          },
        ]}
      >
        <TextStyled fontSize="h6" fontWeight="semibold">
          Newest Postings On
        </TextStyled>

        <View
          style={{
            width: APP_STYLE_VALUES.WH_SIZES.xl3,
            marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          }}
        >
          <FilterStuffType
            variant="transparent"
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          paddingTop: APP_STYLE_VALUES.SPACE_SIZES.sp2,
        }}
      >
        {map(newestPostData, (post, index) => {
          return <CardPostItem post={post} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default CardNewestPostings;
