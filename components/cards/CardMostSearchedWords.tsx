import { View } from "react-native";

import { map } from "lodash";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useListingFilter } from "@/contexts/ListingFilterContext";
import useAppStyles from "@/hooks/useAppStyles";
import { useGetMostSearchedKeysQuery } from "@/services/listingFilterServices";

import ButtonBadge from "../button/ButtonBadge";
import { TextStyled } from "../typography";

const CardMostSearchedWords = () => {
  const {
    commonStyles,

    themeContext,
  } = useAppStyles();
  const { filterValues, setFilterValues } = useListingFilter();

  const { data: mostSearchedKeysData } = useGetMostSearchedKeysQuery(
    {
      categoryId: filterValues?.category || "",
    },
    { skip: !filterValues?.category },
  );

  const handleKeyClick = (key: string) => {
    setFilterValues({
      ...filterValues,
      query: key,
    });
  };
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
          <ButtonBadge
            onClick={() => handleKeyClick(key.keyword)}
            text={key.keyword}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

export default CardMostSearchedWords;
