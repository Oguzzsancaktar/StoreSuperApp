import { useMemo, useState } from "react";
import { View } from "react-native";

import { find, map } from "lodash";

import FilterSearchbar from "@/components/filters/FilterSearchbar";
import FilterStuffType from "@/components/filters/FilterStuffType";
import ImageIconCircle from "@/components/images/ImageIconCircle";
import FlatListStyled from "@/components/override/FlatListStyled";
import IconFilter from "@/components/svg/icon/IconFilter";
import { TextStyled } from "@/components/typography";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useDrawerState } from "@/contexts/DrawerContext";
import { useListingFilter } from "@/contexts/ListingFilterContext";
import useAppStyles from "@/hooks/useAppStyles";
import ISelectOption from "@/interfaces/theme/ISelectOption";
import { useGetListingCategoriesQuery } from "@/services/listingFilterServices";
import { useGetListingItemsQuery } from "@/services/listingServices";

import CardMostSearchedWords from "../CardMostSearchedWords";
import CardPostItem from "../CardPostItem";

const CardListingItems = () => {
  const {
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();

  const { toggleDrawer } = useDrawerState();

  const { filterValues, setFilterValues } = useListingFilter();

  const [showMostSearched, setShowMostSearched] = useState(false);

  const { data: listingCategoriesData } = useGetListingCategoriesQuery();

  const { data: listingItemsData, isLoading: isListingItemsLoading } =
    useGetListingItemsQuery(
      {
        minPrice: filterValues?.price ? filterValues?.price[0] : undefined,
        maxPrice: filterValues?.price ? filterValues?.price[1] : undefined,
        subCategoryIds: filterValues?.subCategoryIds?.value,
        countryId: filterValues?.address?.value || undefined,
        query: filterValues?.query || "",
        categoryId: filterValues?.category || "",
        pageSize: 100,
        pageNumber: 0,
      },
      { skip: !filterValues?.category },
    );

  const listingCategoryOptions = useMemo<ISelectOption[]>(() => {
    return map(listingCategoriesData, (l) => {
      return { label: l.name, value: l.id };
    });
  }, [listingCategoriesData]);

  const handleFilterClick = () => {
    toggleDrawer();
  };

  const handleChange = (text: string) => {
    setFilterValues({ ...filterValues, query: text });
  };

  return (
    <View style={{ height: "100%" }}>
      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            borderColor: theme.primary,
          },
        ]}
      >
        <ImageIconCircle
          onPress={handleFilterClick}
          gradientBg={false}
          radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
          borderColor="grayScale200"
          bgColor="appBackground"
          size={APP_STYLE_VALUES.WH_SIZES.lg}
          icon={<IconFilter color={theme.grayScale900} />}
        />

        <View style={{ flex: 1 }}>
          <FilterSearchbar
            value={filterValues?.query}
            handleChange={handleChange}
            handleMostSearched={setShowMostSearched}
          />
        </View>
        <View
          style={{
            width: APP_STYLE_VALUES.WH_SIZES.xl6,
          }}
        >
          <FilterStuffType
            variant="gray200Outlined"
            value={find(
              listingCategoryOptions,
              (category) => category.value === filterValues?.category,
            )}
            onChange={(option: ISelectOption) =>
              setFilterValues({
                ...filterValues,
                category: option.value as string,
              })
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
        <View>
          <TextStyled
            fontSize="h5"
            fontWeight="bold"
            customColor="primary"
            textAlignment="left"
          >
            {listingItemsData?.totalCount?.toString() || ""}
            {"  "}
          </TextStyled>
        </View>
        <View style={{ marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
          <TextStyled fontSize="h5" fontWeight="bold" textAlignment="left">
            Results Found
          </TextStyled>
        </View>
      </View>

      <FlatListStyled
        isLoading={isListingItemsLoading}
        data={listingItemsData?.items}
        renderItem={({ item }) => <CardPostItem post={item} />}
      ></FlatListStyled>
    </View>
  );
};

export default CardListingItems;
