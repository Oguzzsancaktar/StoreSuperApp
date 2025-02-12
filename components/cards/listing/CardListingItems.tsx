import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { concat, filter, find, join, map } from "lodash";

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
  const { t } = useTranslation();
  const { toggleDrawer } = useDrawerState();

  const { filterValues, setFilterValues } = useListingFilter();

  const [showMostSearched, setShowMostSearched] = useState(false);

  const { data: listingCategoriesData } = useGetListingCategoriesQuery();

  console.log("filterValues", filterValues);
  const { data: listingItemsData, isLoading: isListingItemsLoading } =
    useGetListingItemsQuery(
      {
        minPrice: filterValues?.price ? filterValues?.price[0] : undefined,
        maxPrice: filterValues?.price ? filterValues?.price[1] : undefined,
        subCategoryId: filterValues?.subCategoryId?.value,
        subCategoryIds: filterValues?.subCategoryIds?.value,
        countryId: filterValues?.country?.value || undefined,
        cityId: filterValues?.city?.value || undefined,
        districtId: filterValues?.district?.value || undefined,
        query: filterValues?.query || "",
        categoryId: filterValues?.category || "",
        pageSize: 100,
        pageNumber: 0,
        enginepower: join(filterValues?.enginepower, ","),
        surface: join(filterValues?.surface, ","),
        numberOfFloors: join(filterValues?.numberOfFloors, ","),
        year: join(filterValues?.year, ","),
        mileage: join(filterValues?.mileage, ","),
        registration: join(filterValues?.registration, ","),
        modelIds: filterValues?.modelIds?.value,
        furnished: filterValues?.furnished,
        details: join(
          [
            map(
              filter(filterValues?.details, (c) => c.isChecked),
              (col) => col.value,
            ),
          ],
          ",",
        ),
        numberOfRooms: join(
          [
            map(
              filter(filterValues?.numberOfRooms, (c) => c.isChecked),
              (col) => col.value,
            ),
          ],
          ",",
        ),
        numberOfBathrooms: join(
          [
            map(
              filter(filterValues?.numberOfBathrooms, (c) => c.isChecked),
              (col) => col.value,
            ),
          ],
          ",",
        ),
        purpose: join(
          [
            map(
              filter(filterValues?.purpose, (c) => c.isChecked),
              (col) => col.value,
            ),
          ],
          ",",
        ),
        transmission: join(
          [
            map(
              filter(filterValues?.transmission, (c) => c.isChecked),
              (col) => col.value,
            ),
          ],
          ",",
        ),
        fueltype: join(
          [
            map(
              filter(filterValues?.fueltype, (c) => c.isChecked),
              (col) => col.value,
            ),
          ],
          ",",
        ),
        numberofdoors: join(
          [
            map(
              filter(filterValues?.numberofdoors, (c) => c.isChecked),
              (col) => col.value,
            ),
          ],
          ",",
        ),
        vehicleshpae: join(
          [
            map(
              filter(filterValues?.vehicleshpae, (c) => c.isChecked),
              (col) => col.value,
            ),
          ],
          ",",
        ),
        color: join(
          [
            map(
              filter(filterValues?.color, (c) => c.isChecked),
              (col) => col.value,
            ),
          ],
          ",",
        ),
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
            {t("common.resultFound")}
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
