import { View } from 'react-native';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import ButtonBadge from '../button/ButtonBadge';
import { useGetMostSearchedKeysQuery } from '@/services/listingFilterServices';
import { useListingFilter } from '@/contexts/ListingFilterContext';
import { map } from 'lodash';

const CardMostSearchedWords = () => {
  const commonStyles = useCommonStyles();

  const { filterValues } = useListingFilter();

  const { data: mostSearchedKeysData } = useGetMostSearchedKeysQuery(
    {
      categoryId: filterValues?.category || '',
    },
    { skip: !filterValues?.category }
  );

  return (
    <View>
      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          },
        ]}
      >
        <View>
          <TextStyled fontSize="h4" fontWeight="bold">
            Most
          </TextStyled>
        </View>
        <View>
          <TextStyled fontSize="h4" fontWeight="bold" customColor="primary">
            Searched
          </TextStyled>
        </View>
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        {map(mostSearchedKeysData, (key, index) => (
          <ButtonBadge text={key.keyword} key={index} />
        ))}
      </View>
    </View>
  );
};

export default CardMostSearchedWords;
