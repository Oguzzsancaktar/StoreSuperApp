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

  const { selectedCategory } = useListingFilter();

  const { data: mostSearchedKeysData } = useGetMostSearchedKeysQuery(
    {
      categoryId: selectedCategory || '',
    },
    { skip: !selectedCategory }
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
        <TextStyled fontSize="h4" fontWeight="bold">
          Most
        </TextStyled>
        <TextStyled fontSize="h4" fontWeight="bold" customColor="primary">
          Searched
        </TextStyled>
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
